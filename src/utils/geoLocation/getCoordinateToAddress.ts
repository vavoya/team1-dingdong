export const getCoordsFromAddress = (
  address: string
): Promise<{ lat: number; lng: number } | null> => {
  return new Promise((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK && result.length > 0) {
        const { x, y } = result[0]; // x: 경도, y: 위도
        resolve({ lat: parseFloat(y), lng: parseFloat(x) });
      } else {
        reject(new Error("주소 변환 실패"));
      }
    });
  });
};
