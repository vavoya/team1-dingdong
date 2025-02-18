export function getTravelDuration(departureTime: string, arrivalTime: string, type: 0 | 1 = 0) {
    let depTime = new Date(departureTime);
    let arrTime = new Date(arrivalTime);

    let diffMs = arrTime.getTime() - depTime.getTime(); // 밀리초 단위 차이 계산
    let diffMinutes = Math.floor(diffMs / (1000 * 60)); // 분 단위 변환

    let hours = Math.floor(diffMinutes / 60);
    let minutes = diffMinutes % 60;

    if (type === 0) {
        return `${hours ? `${hours}시간 ` : ''}${minutes ? `${minutes}분` : ''} 소요`.trim();
    }

    if (diffMinutes <= 0) {
        return "이용 완료"; // 도착 시간이 출발 시간보다 빠르거나 같으면 "이용 완료"
    }

    return `${hours ? `${hours}시간 ` : ''}${minutes ? `${minutes}분` : ''} 후 도착`.trim();
}
