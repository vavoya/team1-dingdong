package com.ddbb.dingdong.infrastructure.cache;

import lombok.extern.slf4j.Slf4j;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.*;

/**
 * 간단한 인메모리 캐시 구현체입니다.
 * 이 캐시는 각 항목에 TTL(Time-To-Live)을 적용하며, 만료된 항목은 lazy expiration 방식과
 * 주기적으로 스캔을 하여 만료된 cache를 제거합니다.
 * map 이아니라 set 으로 쓰고 싶다면, K, V에 같은 값을 저장하는 방식으로 사용해 주세요.
 *
 * @param <K> 캐시 키의 타입
 * @param <V> 캐시 값의 타입
 */
@Slf4j
public class SimpleCache<K, V> {
    private final ConcurrentHashMap<K, CacheEntry<V>> map = new ConcurrentHashMap<>();
    public record CacheEntry<V>(V value, long expiryTimeMillis) { }
    private final ScheduledExecutorService scheduler;
    private final Duration ttl;
    private final int RANDOM_SELECT_SIZE;
    /**
     * 기본 생성자입니다.
     * TTL과 cleanup 간격 모두 무제한으로 설정됩니다.
     * (단, 무제한 캐시는 사용을 지양해주세요.)
     */
    public SimpleCache() {
        this(Duration.ofMinutes(Long.MAX_VALUE), Duration.ofMinutes(Long.MAX_VALUE));
    }

    /**
     * 지정한 TTL(분)으로 캐시를 생성합니다.
     * cleanup 간격은 기본 60분으로 설정됩니다.
     *
     * @param ttlMinutes 각 항목의 TTL(분)
     */
    public SimpleCache(int ttlMinutes) {
        this(Duration.ofMinutes(60), Duration.ofMinutes(ttlMinutes));
    }

    /**
     * cleanup 간격과 TTL을 직접 지정하여 캐시를 생성합니다.
     * cleanup 간격은 주기적으로 만료 항목을 제거하는 데 사용됩니다.
     *
     * @param cleanupInterval cleanup 작업 실행 간격
     * @param ttl             각 항목의 TTL
     */
    public SimpleCache(Duration cleanupInterval, Duration ttl) {
        this.RANDOM_SELECT_SIZE = 50;
        this.ttl = ttl;
        this.scheduler = Executors.newSingleThreadScheduledExecutor();
        this.scheduler.scheduleAtFixedRate(
                this::cleanUp,
                cleanupInterval.toMillis(),
                cleanupInterval.toMillis(),
                TimeUnit.MILLISECONDS
        );
    }

    /**
     * 캐시에 키와 값을 저장합니다.
     * 지정된 TTL을 기준으로 만료 시간을 설정합니다.
     * @param key   캐시 키
     * @param value 캐시 값
     */
    public void put(K key, V value) {
        long expiryTime = System.currentTimeMillis() + ttl.toMillis();
        map.put(key, new CacheEntry<>(value, expiryTime));
    }

    /**
     * 캐시에서 키에 해당하는 값을 반환합니다.
     * 만약 항목이 만료되었다면 반환을 하면서 제거합니다 (lazy expiration 전략)
     *
     * @param key 조회할 키
     * @return 만료되지 않은 값 또는 null
     */
    public V get(K key) {
        CacheEntry<V> entry = map.get(key);
        if (entry != null && System.currentTimeMillis() > entry.expiryTimeMillis) {
            return map.remove(key).value;
        }
        return entry != null ? entry.value : null;
    }

    /**
     * 캐시에 해당 키가 존재하는지 확인합니다.
     *
     * @param key 조회할 키
     * @return 키가 존재하면 true, 아니면 false
     */
    public boolean containsKey(K key) {
        CacheEntry<V> entry = map.get(key);
        return entry != null;
    }

    /**
     * 현재 시간 기준으로 만료된 항목들을 제거합니다.
     * 이 메서드는 주기적으로 스캔하며 만료된 캐시를 제거 할 때 사용됩니다.
     */
    protected void cleanUp() {
        long now = System.currentTimeMillis();

        for (Map.Entry<K, CacheEntry<V>> entry : getRandomEntries()) {
            log.info(getRandomEntries().size() + " entries have been cleaned up in " + now + "ms");
            if (now >= entry.getValue().expiryTimeMillis) {
                log.info("clean up cache");
                map.remove(entry.getKey());
            }
        }
    }

    protected List<Map.Entry<K, CacheEntry<V>>> getRandomEntries() {
        List<Map.Entry<K, CacheEntry<V>>> randomEntries = new ArrayList<>();
        int size = map.size();
        if (size == 0) {
            return randomEntries;
        }
        Object[] entryArray = map.entrySet().toArray();
        int sampleSize = Math.min(RANDOM_SELECT_SIZE, size);
        for (int i = 0; i < sampleSize; i++) {
            int randomIndex = ThreadLocalRandom.current().nextInt(entryArray.length);
            @SuppressWarnings("unchecked")
            Map.Entry<K, CacheEntry<V>> entry = (Map.Entry<K, CacheEntry<V>>) entryArray[randomIndex];
            randomEntries.add(entry);
        }

        return randomEntries;
    }
}