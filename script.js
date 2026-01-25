document.addEventListener("DOMContentLoaded", () => {

const GAS_URL = "https://script.google.com/macros/s/AKfycbxLkPkQC_3qo0dEEzpEqlsY2ILhzYmTyu1I2XfClFBbeRMd7ZYFdvjKbRitEKYJsGU/exec";
let allEntries = [];

const app = document.getElementById("app");
const click = document.getElementById("click");
const success = document.getElementById("success");
const error = document.getElementById("error");

const carwashForm = document.getElementById("carwashForm");
const timestamp = document.getElementById("timestamp");
const date = document.getElementById("date");
const name = document.getElementById("name");
const unit = document.getElementById("unit");
const payment = document.getElementById("payment");

const entryTable = document.getElementById("entryTable");
const searchInput = document.getElementById("searchInput");
const paymentFilter = document.getElementById("paymentFilter");

/* FORMAT DATE */
function formatDateHuman(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

/* LOADING */
const loadingText = "Wait a sec . . . ☕";
let i = 0;
const loading = document.getElementById("loading");
const loadingTextEl = document.getElementById("loading-text");

if (loadingTextEl) {
  const type = () => {
    if (i < loadingText.length) {
      loadingTextEl.textContent += loadingText.charAt(i++);
      setTimeout(type, 120);
    }
  };
  type();
}

setTimeout(() => {
  loading.remove();        // benar-benar hilang
  app.classList.remove("hidden");
}, 4000);

/* TABS */
document.querySelectorAll(".tab").forEach(tab => {
  tab.onclick = () => {
    click.play();
    document.querySelectorAll(".tab,.tab-content")
      .forEach(e => e.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
    if (tab.dataset.tab === "entry") loadEntries();
  };
});

/* PAYMENT */
document.querySelectorAll(".pay").forEach(btn => {
  btn.onclick = () => {
    click.play();
    document.querySelectorAll(".pay").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    payment.value = btn.dataset.pay;
  };
});

/* POPUP */
const popupBox = document.getElementById("popup");
function showPopup(msg, sound) {
  popupBox.innerText = msg;
  popupBox.style.display = "block";
  document.getElementById(sound).play();
  setTimeout(() => popupBox.style.display = "none", 2000);
}

/* SUBMIT */
carwashForm.onsubmit = e => {
  e.preventDefault();
  click.play();

  if (!date.value || !name.value || !unit.value) {
    showPopup("Please Try Again!❌", "error");
    return;
  }

  timestamp.value = new Date().toISOString();

  fetch(GAS_URL, {
    method: "POST",
    body: new FormData(carwashForm)
  })
  .then(r => r.json())
  .then(() => {
    showPopup("Success!✅", "success");

    carwashForm.reset();
    payment.value = "Cash";
    document.querySelectorAll(".pay").forEach(b => b.classList.remove("active"));
    document.querySelector(".pay.cash").classList.add("active");
  })
  .catch(() => showPopup("Please Try Again!❌", "error"));
};

/* LOAD ENTRY */
function loadEntries() {
  fetch(GAS_URL)
    .then(r => r.json())
    .then(data => {
      allEntries = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      renderEntries(allEntries);
    });
}

function renderEntries(data) {
  let html = "", currentDate = "";

  data.forEach(r => {
    const d = formatDateHuman(r.date);
    if (d !== currentDate) {
      if (currentDate) html += "</tbody></table>";
      currentDate = d;
      html += `
        <h3 class="date-group">${d}</h3>
        <table class="entry-table">
          <thead>
            <tr>
              <th>Date</th><th>Name</th><th>Unit</th><th>Payment</th>
            </tr>
          </thead><tbody>
      `;
    }
    html += `
      <tr>
        <td>${d}</td>
        <td>${r.name}</td>
        <td>${r.unit}</td>
        <td>${r.payment}</td>
      </tr>
    `;
  });

  if (data.length) html += "</tbody></table>";
  entryTable.innerHTML = html;
}

/* FILTER */
searchInput.oninput = paymentFilter.onchange = () => {
  const q = searchInput.value.toLowerCase();
  const p = paymentFilter.value;
  renderEntries(
    allEntries.filter(e =>
      (e.name.toLowerCase().includes(q) ||
       e.unit.toLowerCase().includes(q)) &&
      (!p || e.payment === p)
    )
  );
};

});
