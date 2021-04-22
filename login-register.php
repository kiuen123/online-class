<!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng kí - Đăng nhập</title>
    <meta property="og:image" content="#">
    <meta name="description" content="">
    <meta name="author" content="Nguyễn Trung Kiên">
    <!-- css của tôi -->
    <link rel="stylesheet" href="./css/home.css">
    <link rel="stylesheet" href="./css/login-register.css">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="./resource/bootstrap-5/css/bootstrap.min.css">
    <script src="../resource/bootstrap-5/js/bootstrap.bundle.min.js"></script>
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
                    <a href="./home.html">
                        <!-- <img src="../resource/image/test.png" alt="" class="logo"> -->
                        <img src="../resource/image/logo.png" alt="" class="logo">
                    </a>
                    <div style="font-size: 16px;
                                vertical-align: top;
                                color: #fff;
                                position: relative;
                                padding: 21px 20px;">
                        | Online class
                    </div>
                    <a href="./home.html">
                        <div class="nab-item">
                            Trang chủ
                        </div>
                    </a>
                </div>
            </div>
            <!-- kết thúc nội dung nabbar -->
        </div>
    </div>
    <!-- end nabbar -->

    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-6 login" id="login">
                    <div class="card login-main">
                        <div style="display: flex;
                                    justify-content: center;">
                            <img src="./resource/image/logo.png" alt="" width="50%">
                        </div>
                        <div style="display: flex;
                                    justify-content: center;">
                            <h3>Đăng nhập</h3>
                        </div>
                        <form action="" style=" display: flex;
                                                justify-content: center;">
                            <table>
                                <tr>
                                    <td>
                                        <p>Tên đăng nhập</p>
                                    </td>
                                    <td>
                                        <input type="text" name="" id="" style="border:1px black solid;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Mật khẩu</p>
                                    </td>
                                    <td>
                                        <input type="password" name="" id="" style="border:1px black solid;">
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <button class="confirm">
                                            Đăng nhập
                                        </button>
                                    </td>
                                </tr>
                            </table>

                        </form>
                    </div>
                </div>

                <div class="col-md-6 login" id="register">
                    <div class="card login-main">

                        <div style="display: flex;
                                    justify-content: center;">
                            <img src="../resource/image/logo.png" alt="" width="50%">
                        </div>
                        <div style="display: flex;
                                    justify-content: center;">
                            <h3>Đăng kí</h3>
                        </div>
                        <form action="" style=" display: flex;
                                                justify-content: center;">
                            <table>
                                <tr>
                                    <td>
                                        <p>Tên đăng nhập</p>
                                    </td>
                                    <td>
                                        <input type="text" name="" id="" style="border:1px black solid;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Email</p>
                                    </td>
                                    <td>
                                        <input type="email" name="" id="" style="border:1px black solid;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Mật khẩu</p>
                                    </td>
                                    <td>
                                        <input type="password" name="" id="" style="border:1px black solid;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Xác nhận mật khẩu</p>
                                    </td>
                                    <td>
                                        <input type="password" name="" id="" style="border:1px black solid;">
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <button class="confirm">
                                            Đăng kí
                                        </button>
                                    </td>
                                </tr>
                            </table>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!-- JavaScript -->
</body>

</html>