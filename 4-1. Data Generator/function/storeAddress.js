// 주소
export function addressgen() {
    let cities = ['서울시', '인천시', '부산시', '대전시', '세종시', '광주시', '대구시', '울산시']
    let regions = ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구']

    let city = cities[Math.floor(Math.random() * cities.length)];
    let region = regions[Math.floor(Math.random() * regions.length)];
    let street = Math.floor(Math.random() * 100) + 1;
    let postcode = Math.floor(Math.random() * 10000) + 1;

    return `${postcode} ${city} ${region} ${street}길 `;
}

// console.log(addressgen());