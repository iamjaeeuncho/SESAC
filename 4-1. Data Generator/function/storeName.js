// 스토어 이름 생성
export function storegen() {
    let brands = ['스타벅스', '투썸플레이스', '커피빈', '이디야', '빽다방', "메가커피"];
    let branches = ['강남', '방배', '청담', '신림', '건대', '명동', '홍대', '신촌', '종로', '대학로', '노원', '동대문'];
  
    let brand = brands[Math.floor(Math.random() * brands.length)];
    let branch = branches[Math.floor(Math.random() * branches.length)];
    let num = Math.floor(Math.random() * 10);
    return `${brand} ${branch} ${num}호점`;
  }
  
  // console.log(storegen());
  