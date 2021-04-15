var danhsachtieudiem = [{
    ngay: 0,
    thang: 0,
    tieude: "ahihi",
}, {
    ngay: 0,
    thang: 0,
    tieude: "ahihi",
}, {
    ngay: 0,
    thang: 0,
    tieude: "ahihi",
}, {
    ngay: 0,
    thang: 0,
    tieude: "ahihi",
}, {
    ngay: 0,
    thang: 0,
    tieude: "ahihi",
}, ]

var tieudiem = document.getElementById("tieudiem")
var li = [],
    div1 = [],
    div2 = [],
    div3 = [],
    h = [];

for (let i = 0; i < danhsachtieudiem.length; i++) {
    li = document.createElement("li")
    li.setAttribute("class", "list-group-item")
    tieudiem.appendChild(li)

    div1 = document.createElement("div")
    div1.setAttribute("class", "row")
    li.appendChild(div1)

    div2 = document.createElement("div")
    div2.setAttribute("class", "col-sm-3")
    div2.textContent = danhsachtieudiem[i].ngay + "/" + danhsachtieudiem[i].thang
    div1.appendChild(div2)

    div3 = document.createElement("div")
    div3.setAttribute("class", "col-sm-9")
    div1.appendChild(div3)

    h = document.createElement("h5")
    h.textContent = danhsachtieudiem[i].tieude
    div3.appendChild(h)
}