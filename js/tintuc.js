var danhsachtintuc = [{
    tieude: "Tin tức 1",
    tomtat: "tóm tắt của tin tức số 1",
    anh1: "../resource/image/slide2.png",
    anh2: "",
    anh3: "",
    luotxem: 3,
    luotbinhluan: 4,
}, {
    tieude: "Tin tức 2",
    tomtat: "tóm tắt của tin tức số 2",
    anh1: "",
    anh2: "",
    anh3: "",
    luotxem: 3,
    luotbinhluan: 4,
}, {
    tieude: "Tin tức 3",
    tomtat: "tóm tắt của tin tức số 3",
    anh1: "",
    anh2: "",
    anh3: "",
    luotxem: 3,
    luotbinhluan: 4,
}, {
    tieude: "Tin tức 4",
    tomtat: "tóm tắt của tin tức số 4",
    anh1: "",
    anh2: "",
    anh3: "",
    luotxem: 3,
    luotbinhluan: 4,
}, ]

var tintuc = document.getElementById("tintuc")
var div1 = [],
    div2 = [],
    div3 = [],
    h = [],
    p1 = [],
    div4 = [],
    img1 = [],
    img2 = [],
    img3 = [],
    div5 = [],
    div6 = [],
    div7 = [],
    i1 = [],
    p2 = [],
    div8 = [],
    i2 = [],
    p3 = [],
    div9 = [],
    button = [],
    i3 = [];

for (let i = 0; i < danhsachtintuc.length; i++) {
    div1 = document.createElement("div")
    div1.setAttribute("class", "col-md-12")
    tintuc.appendChild(div1)

    div2 = document.createElement("div")
    div2.setAttribute("class", "card")
    div1.appendChild(div2)

    div3 = document.createElement("div")
    div3.setAttribute("class", "card-body")
    div2.appendChild(div3)

    h = document.createElement("h4")
    h.setAttribute("class", "card-title")
    h.textContent = danhsachtintuc[i].tieude
    div3.appendChild(h)

    p1 = document.createElement("p")
    p1.setAttribute("class", "card-text")
    p1.textContent = danhsachtintuc[i].tomtat
    div3.appendChild(p1)

    div4 = document.createElement("div")
    div4.setAttribute("class", "image-site")
    div2.appendChild(div4)

    img1 = document.createElement("img")
    img1.setAttribute("class", "card-img-top")
    img1.setAttribute("src", danhsachtintuc[i].anh1)
    img1.setAttribute("alt", "")
    img1.setAttribute("style", "max-width: 300px;")
    div4.appendChild(img1)

    img2 = document.createElement("img")
    img2.setAttribute("class", "card-img-top")
    img2.setAttribute("src", danhsachtintuc[i].anh2)
    img2.setAttribute("alt", "")
    img2.setAttribute("style", "max-width: 300px;")
    div4.appendChild(img2)

    img3 = document.createElement("img")
    img3.setAttribute("class", "card-img-top")
    img3.setAttribute("src", danhsachtintuc[i].anh3)
    img3.setAttribute("alt", "")
    img3.setAttribute("style", "max-width: 300px;")
    div4.appendChild(img3)

    div5 = document.createElement("div")
    div5.setAttribute("class", "row")
    div2.appendChild(div5)

    div6 = document.createElement("div")
    div6.setAttribute("class", "col-md-10")
    div6.setAttribute("style", "display: flex;")
    div5.appendChild(div6)

    div7 = document.createElement("div")
    div7.setAttribute("style", "display: flex; padding-left: 10px;")
    div6.appendChild(div7)

    i1 = document.createElement("i")
    i1.setAttribute("class", "fas fa-eye")
    div7.appendChild(i1)

    p2 = document.createElement("p")
    p2.textContent = danhsachtintuc[i].luotxem
    div7.appendChild(p2)

    div8 = document.createElement("div")
    div8.setAttribute("style", "display: flex; padding-left: 10px;")
    div6.appendChild(div8)

    i2 = document.createElement("i")
    i2.setAttribute("class", "fas fa-comment-dots")
    div8.appendChild(i2)

    p3 = document.createElement("p")
    p3.textContent = danhsachtintuc[i].luotbinhluan
    div8.appendChild(p3)

    div9 = document.createElement("div")
    div9.setAttribute("class", "col-md-2")
    div5.appendChild(div9)

    button = document.createElement("button")
    button.setAttribute("style", "float: right; margin-right: 10px; background-color: #fff;")
    button.textContent = "Chi tiết "
    div9.appendChild(button)

    i3 = document.createElement("i")
    i3.setAttribute("class", "fas fa-chevron-circle-right")
    button.appendChild(i3)
}