let start = 0;
const itemsPerLoad = 20;
let end = start + itemsPerLoad;
let loading = false;

const container = document.getElementById("scroll-container");

loadInitialData();

// 데이터 로딩
function loadInitialData() {
  console.log(`초기 데이터 로딩 ${start} ~ ${end}`);
  fetchData();
}

// 무한 스크롤 이벤트 추가
window.addEventListener("scroll", () => {
  if (
    !loading &&
    window.innerHeight + window.scrollY >= document.body.offsetHeight
  ) {
    end = start + itemsPerLoad;
    console.log(`화면 끝까지 도달 및 다음 데이터 요청 ${start} ~ ${end}`);
    fetchData();
  }
});

function fetchData() {
  loading = true;
  fetch(`/get-items?start=${start}&end=${end}`)
    .then((response) => response.json())
    .then((items) => {
      items.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.textContent = item;
        container.appendChild(itemElement);
      });

      // 화면에 오래된 데이터 삭제
      const itemsToRemove = container.children.length - 100;
      if (itemsToRemove > 0) {
        for (let i = 0; i < itemsToRemove; i++) {
          container.removeChild(container.firstElementChild);
        }
      }

      // 다음 데이터 로딩을 위한 출발값 변경
      start += items.length;
      loading = false;
    });
}
