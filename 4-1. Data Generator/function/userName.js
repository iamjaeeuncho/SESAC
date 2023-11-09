// 이름 생성
export function namegen() {
    let names = ['수', '찬', '민', '도', '하', '지', '주', '준', '시', '건', '예', '선', '연', '유', '현', '지', '은', '갑', '효', '리', '진', '승', '환', '준', '윤', '우', '호', '원', '후', '서', '현', '혁', '진', '환', '훈', '재', '민']
    let familynames = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한']

    let firstname = names[Math.floor(Math.random() * names.length)];
    let middlename = names[Math.floor(Math.random() * names.length)];
    let lastname = familynames[Math.floor(Math.random() * familynames.length)];

    return `${lastname}${firstname}${middlename}`;
}

// console.log(namegen());