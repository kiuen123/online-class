<?php include ("./admin/connect.php"); ?>
<!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Class</title>
    <meta property="og:image" content="#">
    <meta name="description" content="miêu tả gì đó">
    <meta name="author" content="Nguyễn Trung Kiên">
    <!-- css của tôi -->
    <link rel="stylesheet" href="./css/home.css">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="./resource/bootstrap-5/css/bootstrap.min.css">
    <script src="./resource/bootstrap-5/js/bootstrap.bundle.min.js"></script>
    <!-- Fontawesome -->
    <link rel="stylesheet" href="./resource/fontawesome/css/all.css">
</head>

<body>
<!-- nabbar -->
<div class="top-nab">
        <div class="container">
            <div class="row">
                <!-- bắt đầu nội dung của nabbar -->
                <!-- logo, home, ... -->
                <div class="col-md-9" style="display: flex;">
                    <a href="./home.php">
                        <img src="./resource/image/logo.png" alt="" class="logo">
                    </a>
                    <div style="font-size: 16px;
                                vertical-align: top;
                                color: #fff;
                                position: relative;
                                padding: 21px 20px;">
                        | Online class
                    </div>
                    <a href="./home.php">
                        <div class="nab-item">
                            Trang chủ
                        </div>
                    </a>
                    <a href="./class.php">
                        <div class="nab-item">
                            Lớp học
                        </div>
                    </a>
                </div>
                <!-- thanh tìm kiếm, đăng kí đăng nhập, ... -->
                <div class="col-md-3" style="display: flex;">
                    <div class="search-bar">
                        <input type="text" class="search-bar-input">
                        <button class="search-bar-button">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                    <a href="#" style="color: #fff !important;">
                        <div class="nab-item" style="border-radius: 50%; 
                                                width: 66px;">
                            <i class="fas fa-user"></i>
                        </div>
                    </a>

                </div>
                <!-- kết thúc nội dung nabbar -->
            </div>
        </div>
    </div>
    <!-- end nabbar -->

<!-- slide show -->
<div class="slide-show">
        <div class="container">
            <div class="row">
                <!-- bắt đầu nội dung của slide show -->

                <!-- slide trong này -->
                <div class="col-md-9">
                    <div class="slide">
                        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="./resource/image/slide1.png" class="d-block w-100" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="./resource/image/slide2.png" class="d-block w-100" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="./resource/image/slide3.jpg" class="d-block w-100" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="./resource/image/slide1.png" class="d-block w-100" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="./resource/image/slide2.png" class="d-block w-100" alt="...">
                                </div>
                            </div>
                            <button class="carousel-control-prev slide-button" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next slide-button" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                              <span class="carousel-control-next-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <!-- về căn bản thì slide show thế này cũng dc nhưng tôi muốn chỉnh sửa nhiều hơn -->

                    <!-- chưa biết thêm j vào đây -->
                    <div class="col-md-3">
                        <div class="???">

                        </div>
                    </div>

                    <!-- kết thúc nội dung của slide show -->
                </div>
            </div>
        </div>
        <!-- end slide show -->

        
        <!-- nội dung chính -->
        <div class="content">
            <div class="container">
                <div class="row">
                    <!-- bắt đầu nôi dung chính -->

                    <!-- tin tức -->
                    <div class="col-md-9">
                        <h3 style=" background-color: rgb(205, 33, 34);
                                    color:#FFF;
                                    padding: 5px;">TIN TỨC</h3>
                        <div class="tintuc">
                            <div class="row" id="tintuc">

                                <?php
                                    $sql = "SELECT * FROM tintuc ORDER BY matintuc DESC LIMIT 10";
                                    mysqli_set_charset($connect, "UTF8");
                                    $result = mysqli_query($connect, $sql);
                                    while ($row = mysqli_fetch_assoc($result)) {
                                ?>
                                <div class="col-md-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title"><?php echo $row['tieude'] ?></h4>
                                            <p class="card-text"><?php echo $row['tomtat'] ?></p>
                                        </div>
                                        <div class="image-site">
                                            <img class="card-img-top" src="<?php echo $row['anh1'] ?>" alt="" style="max-width: 300px;">
                                            <img class="card-img-top" src="<?php echo $row['anh2'] ?>" alt="" style="max-width: 300px;">
                                            <img class="card-img-top" src="<?php echo $row['anh3'] ?>" alt="" style="max-width: 300px;">
                                        </div>
                                        <div class="row">
                                            <div class="col-md-10" style="display: flex;">
                                                <div style="display: flex; padding-left: 10px;">
                                                    <i class="fas fa-eye"></i>
                                                    <p><?php echo $row['luotxem'] ?></p>
                                                </div>
                                                <div style="display: flex; padding-left: 10px;">
                                                    <i class="fas fa-comment-dots"></i>
                                                    <p><?php echo $row['luotbinhluan'] ?></p>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <button style=" float: right;
                                                                margin-right: 10px;
                                                                background-color: #fff;">
                                                    Chi tiết <i class="fas fa-chevron-circle-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <?php } ?>

                            </div>
                        </div>
                    </div>

                    <!-- tiêu điểm -->
                    <div class="col-md-3">
                        <h3 style=" background-color: rgb(205, 33, 34);
                                    color: #fff;
                                    padding: 5px;">TIÊU ĐIỂM NỔI BẬT</h3>
                        <div class="tieudiem">
                            <div class="card">

                                <ul class="list-group list-group-flush" id="tieudiem">
                                    
                                    <?php
                                        $sql = "SELECT * FROM tieudiem ORDER BY matieudiem DESC LIMIT 10";
                                        mysqli_set_charset($connect, "UTF8");
                                        $result = mysqli_query($connect, $sql);
                                        while ($row = mysqli_fetch_assoc($result)) {
                                    ?>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-sm-3">
                                            <?php echo $row['ngay'] ?>/<?php echo $row['thang'] ?>
                                            </div>
                                            <div class="col-sm-9">
                                                <h5><?php echo $row['ten'] ?></h5>
                                            </div>
                                        </div>
                                    </li>
                                    <?php } ?>

                                </ul>

                            </div>
                            <button style=" float: right;
                                            margin-right: 10px;
                                            background-color: #f9fadc;">
                                <i class="fas fa-chevron-circle-down"></i>
                                Xem thêm
                            </button>

                        </div>
                    </div>

                    <!-- kết thúc nội dung chính -->
                </div>
            </div>
        </div>
        <!-- end nội dung chính -->

        <!-- thông tin khác -->
        <div class="thongtinkhac">
            <div class="container">
                <div class="row">
                    <!-- các thông tin liêu quan ở trong này VD:fb, youtube,vv -->
                </div>
            </div>
        </div>
        <!-- end nội dung khác -->

        </body>

</html>