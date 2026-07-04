// =============================
// CSC AUTO BILLING SYSTEM
// =============================

const serviceDB = [
  { name: "Aadhaar Full-Size Lamination", price: 100 },
  { name: "Aadhaar PVC Card", price: 100 },
  { name: "Aadhaar Card Small-Size Lamination", price: 50 },
  { name: "7/12 Digital Utara", price: 30 },
  { name: "7/12 Utara", price: 10 },
  { name: "Khate Utara Digital", price: 30 },
  { name: "Khate Utara ", price: 10 },
  { name: "Utara Nond", price: 150 },
  { name: "Ayushman Card", price: 50 },
  { name: "Abha Card", price: 50 },
  { name: "E-Shram Card", price: 50 },
  { name: "Voter ID Card", price: 100 },
  { name: "Voter ID Correction", price: 100 },
  { name: "Pik Vima", price: 200 },
  { name: "Udyam Aadhaar", price: 200 },
  { name: "Lamination Full-Size", price: 20 },
  { name: "Lamination Medium-Size", price: 15 },
  { name: "Lamination Small-Size", price: 10 },
  { name: "Online Print Small-Size", price: 5 },
  { name: "Online Print Full-Size", price: 10 },
  { name: "Xerox One Side", price: 2 },
  { name: "Xerox Two Side", price: 3 },
  { name: "Colour Online Print", price: 10 },
  { name: "PM Kisan", price: 400 },
  { name: "Agristack", price: 100 },
  { name: "HSRP Number Plate", price: 150 },
  { name: "Income Certificate", price: 100 },
  { name: "Non-Criminal Certificate", price: 200 },
  { name: "Caste Certificate", price: 400 },
  { name: "Central Caste Certificate", price: 200 },
  { name: "Nationality & Domicile Certificate", price: 200 },
  { name: "General KYC", price: 50 },
  { name: "Passport Size Photo", price: 50 },
  { name: "Passport Size Photos (Urgent)", price: 70 },
  { name: "Digital Photo Print", price: 100 },
  { name: "Digital Ration Card", price: 100 },
  { name: "Marriage Certificate", price: 250 },
  { name: "Birth Certificate", price: 200 }
];

const marathiNames = {
  "Aadhaar Full-Size Lamination": "आधार फुल साईज लॅमिनेशन",
  "Aadhaar PVC Card": "आधार PVC कार्ड",
  "Aadhaar Card Small-Size Lamination": "आधार कार्ड स्मॉल साईज लॅमिनेशन",
  "7/12 Digital Utara": "७/१२ डिजिटल उतारा",
  "7/12 Utara": "७/१२ उतारा",
  "Khate Utara Digital": "खाते उतारा (डिजिटल)",
  "Khate Utara ": "खाते उतारा",
  "Utara Nond": "उतारा नोंद",
  "Ayushman Card": "आयुष्मान कार्ड",
  "Abha Card": "आभा कार्ड",
  "E-Shram Card": "ई-श्रम कार्ड",
  "Voter ID Card": "मतदार ओळखपत्र",
  "Voter ID Correction": "मतदार ओळखपत्र दुरुस्ती",
  "Pik Vima": "पीक विमा",
  "Udyam Aadhaar": "उद्यम आधार",
  "Lamination Full-Size": "लॅमिनेशन (फुल साईज)",
  "Lamination Medium-Size": "लॅमिनेशन (मध्यम)",
  "Lamination Small-Size": "लॅमिनेशन (लहान)",
  "Online Print Small-Size": "ऑनलाइन प्रिंट (लहान)",
  "Online Print Full-Size": "ऑनलाइन प्रिंट (फुल साईज)",
  "Xerox One Side": "झेरॉक्स (एक बाजू)",
  "Xerox Two Side": "झेरॉक्स (दोन्ही बाजू)",
  "Colour Online Print": "रंगीत ऑनलाइन प्रिंट",
  "PM Kisan": "पीएम किसान",
  "Agristack": "अ‍ॅग्रीस्टॅक",
  "HSRP Number Plate": "एचएसआरपी नंबर प्लेट",
  "Income Certificate": "उत्पन्न प्रमाणपत्र",
  "Non-Criminal Certificate": "गुन्हा नसल्याचे प्रमाणपत्र",
  "Caste Certificate": "जात प्रमाणपत्र",
  "Central Caste Certificate": "केंद्रीय जात प्रमाणपत्र",
  "Nationality & Domicile Certificate": "राष्ट्रीयत्व व अधिवास प्रमाणपत्र",
  "General KYC": "सामान्य KYC",
  "Passport Size Photo": "पासपोर्ट साईज फोटो",
  "Passport Size Photos (Urgent)": "पासपोर्ट साईज फोटो (तातडीचे)",
  "Digital Photo Print": "डिजिटल फोटो प्रिंट",
  "Digital Ration Card": "डिजिटल रेशन कार्ड",
  "Marriage Certificate": "विवाह प्रमाणपत्र",
  "Birth Certificate": "जन्म प्रमाणपत्र"
};

let bill = [];

const billItems = document.getElementById("billItems");
const total = document.getElementById("total");
const billNumber = document.getElementById("billNumber");

// BILL NO
let billNo = localStorage.getItem("billNo") || 1001;
billNumber.innerText = billNo;

// ================= SEARCH BOX =================

const input = document.createElement("input");
input.placeholder = "Search Service (Aadhaar, PAN...)";
input.style.width = "100%";
input.style.padding = "10px";
input.autocomplete = "off";

const box = document.createElement("div");

document.querySelector(".custom-service").appendChild(input);
document.querySelector(".custom-service").appendChild(box);

let filteredServices = [];
let selectedIndex = -1;

// AUTO DATE
document.getElementById("billDate").value =
new Date().toISOString().split("T")[0];

// ================= SMART SEARCH (FIXED) =================
function getScore(name, value) {
    let score = 0;

    if (name.startsWith(value)) score += 100;
    if (name.split(" ").some(w => w.startsWith(value))) score += 80;
    if (name.includes(value)) score += 50;
    if (value.includes("lami") && name.includes("lamination")) score += 30;

    return score;
}

// RENDER
function render() {
    box.innerHTML = "";

    filteredServices.forEach((s, i) => {

        let div = document.createElement("div");
        div.className = "suggestion";

        if (i === selectedIndex) {
            div.classList.add("active");
        }

        div.innerText = `${s.name} - ₹${s.price}`;

        div.onclick = () => {
            addItem(s);
            clearSearch();
        };

        box.appendChild(div);
    });
}

function clearSearch() {
    input.value = "";
    box.innerHTML = "";
    filteredServices = [];
    selectedIndex = -1;
    input.focus();
}

// INPUT (FIXED SEARCH)
input.addEventListener("input", function () {

    let value = this.value.toLowerCase().trim();

    if (!value) {
        box.innerHTML = "";
        filteredServices = [];
        selectedIndex = -1;
        return;
    }

    filteredServices = serviceDB
        .map(s => ({
            ...s,
            score: getScore(s.name.toLowerCase(), value)
        }))
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score);

    selectedIndex = 0;
    render();
});

// KEYBOARD CONTROL
input.addEventListener("keydown", function (e) {

    if (filteredServices.length === 0) return;

    if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedIndex++;
        if (selectedIndex >= filteredServices.length) selectedIndex = 0;
        render();
    }

    else if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedIndex--;
        if (selectedIndex < 0) selectedIndex = filteredServices.length - 1;
        render();
    }

    else if (e.key === "Enter") {
        e.preventDefault();

        if (selectedIndex >= 0) {
            addItem(filteredServices[selectedIndex]);
        } else {
            addItem(filteredServices[0]);
        }

        clearSearch();
    }
});

// ADD ITEM
function addItem(service){

let exist = bill.find(i => i.name === service.name);

if(exist){
exist.qty++;
}else{
bill.push({...service, qty:1});
}

updateBill();
}

// UPDATE BILL
function updateBill(){

billItems.innerHTML = "";

let totalAmount = 0;

bill.forEach((item, i) => {

let amount = item.price * item.qty;
totalAmount += amount;

billItems.innerHTML += `
<tr>
<td>${marathiNames[item.name] || item.name}</td>
<td>₹${item.price}</td>
<td>
<input class="qty" type="number" min="1"
value="${item.qty}"
onchange="changeQty(${i},this.value)">
</td>
<td>₹${amount}</td>
<td>
<button onclick="removeItem(${i})">X</button>
</td>
</tr>
`;

});

total.innerText = totalAmount;

}

// QTY
function changeQty(i,val){
bill[i].qty = Number(val);
updateBill();
}

// REMOVE
function removeItem(i){
bill.splice(i,1);
updateBill();
}

// BILL NO UPDATE
window.onafterprint = () => {
billNo++;
localStorage.setItem("billNo",billNo);
billNumber.innerText = billNo;
};
