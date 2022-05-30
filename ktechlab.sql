-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 20, 2022 lúc 11:34 PM
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ktechlab`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `carepost`
--

CREATE TABLE `carepost` (
  `user` int(11) NOT NULL,
  `post` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `carepost`
--

INSERT INTO `carepost` (`user`, `post`) VALUES
(20, 67);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `checklist`
--

CREATE TABLE `checklist` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `date` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `checklist`
--

INSERT INTO `checklist` (`id`, `user`, `date`) VALUES
(7, 20, '30/12/2021 - 0:26:17'),
(7, 23, '30/12/2021 - 2:29:34'),
(11, 20, '20/1/2022 - 9:19:56');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `checkpoint`
--

CREATE TABLE `checkpoint` (
  `id` int(11) NOT NULL,
  `class` int(11) NOT NULL,
  `code` text NOT NULL,
  `ngay` int(11) NOT NULL,
  `thang` int(11) NOT NULL,
  `nam` int(11) NOT NULL,
  `luot_diem_danh` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `checkpoint`
--

INSERT INTO `checkpoint` (`id`, `class`, `code`, `ngay`, `thang`, `nam`, `luot_diem_danh`) VALUES
(7, 42, '99123', 30, 12, 2021, 2),
(11, 42, '99123', 20, 1, 2022, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `class`
--

CREATE TABLE `class` (
  `id` int(11) NOT NULL,
  `ten_lop` varchar(255) NOT NULL,
  `giao_vien` int(11) NOT NULL,
  `ngay_bat_dau` text NOT NULL,
  `ngay_ket_thuc` text NOT NULL,
  `link_online` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `class`
--

INSERT INTO `class` (`id`, `ten_lop`, `giao_vien`, `ngay_bat_dau`, `ngay_ket_thuc`, `link_online`) VALUES
(42, 'Machine Learning', 19, '29/12/2021', '28/02/2022', ''),
(44, 'Web3D', 19, '02/12/2021', '15/01/2022', ''),
(45, 'android', 19, '29/12/2021', '29/01/2022', ''),
(46, 'Cơ sở dữ liệu', 19, '01/12/2021', '29/01/2022', ''),
(47, 'Khai phá dữ liệu', 19, '01/11/2021', '01/01/2022', ''),
(48, 'Kiểm thử', 19, '01/11/2021', '01/01/2022', ''),
(49, 'lập trình phân tán', 19, '01/11/2021', '01/02/2022', ''),
(50, 'Linux và phần mềm mã nguồn mở', 19, '01/11/2021', '01/02/2022', ''),
(51, 'Phát triển dự án', 19, '01/11/2021', '01/02/2022', ''),
(52, 'Ngôn ngữ lập trình', 19, '01/11/2020', '01/02/2021', ''),
(53, 'Toán rời rạc', 19, '01/11/2020', '01/02/2021', ''),
(54, 'Xác suất thống kê', 19, '01/01/2022', '01/03/2022', ''),
(55, 'Mạng máy tính', 19, '01/01/2022', '01/03/2022', ''),
(56, 'Machine Learning 02', 19, '01/01/2022', '01/03/2022', ''),
(57, 'Machine Learning 03', 19, '01/01/2022', '01/03/2022', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `bai_viet` int(11) NOT NULL,
  `nguoi_viet` int(11) NOT NULL,
  `noi_dung` text NOT NULL,
  `ngay_dang` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`id`, `bai_viet`, `nguoi_viet`, `noi_dung`, `ngay_dang`) VALUES
(18, 67, 20, '<p>đã update tài liệu mới nhé</p>', '20/1/2022 - 8:53:15');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `learn`
--

CREATE TABLE `learn` (
  `class` int(11) NOT NULL,
  `student` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `learn`
--

INSERT INTO `learn` (`class`, `student`) VALUES
(42, 20),
(42, 21),
(42, 22),
(42, 23),
(42, 24),
(42, 25),
(42, 26),
(44, 20),
(45, 20),
(46, 20),
(47, 20),
(48, 20),
(49, 20),
(50, 20),
(51, 20),
(52, 20),
(53, 20),
(54, 20),
(55, 20);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `learntime`
--

CREATE TABLE `learntime` (
  `id` int(11) NOT NULL,
  `thu` text NOT NULL,
  `gio_bat_dau` text NOT NULL,
  `gio_ket_thuc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `learntime`
--

INSERT INTO `learntime` (`id`, `thu`, `gio_bat_dau`, `gio_ket_thuc`) VALUES
(42, 'Thứ 2', '07:00', '08:30');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `nguoi_viet` int(11) NOT NULL,
  `class` int(11) NOT NULL,
  `ten_bai_viet` varchar(255) NOT NULL,
  `noi_dung` text NOT NULL,
  `ngay_dang` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `post`
--

INSERT INTO `post` (`id`, `nguoi_viet`, `class`, `ten_bai_viet`, `noi_dung`, `ngay_dang`) VALUES
(67, 19, 42, 'đã gửi toàn bộ tài liệu học tập', '<p>Xin chào mọi người,</p><p>hiện nay toàn bộ tài kiệu học tập đã có trong kho lưu trữ các bạn hãy kiểm tra lại.</p>', '29/12/2021 - 23:51:32');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `ten_vai_tro` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `role`
--

INSERT INTO `role` (`id`, `ten_vai_tro`) VALUES
(1, 'admin'),
(2, 'học sinh/sinh viên'),
(3, 'giáo viên/giảng viên');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `store`
--

CREATE TABLE `store` (
  `class` int(11) NOT NULL,
  `link` text NOT NULL,
  `ngay_dang` text NOT NULL,
  `luot_xem` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `store`
--

INSERT INTO `store` (`class`, `link`, `ngay_dang`, `luot_xem`) VALUES
(42, '/class/Machine Learning/Chapter 1-Introduction_ok.pdf', '29-12-2021_23-43-9', 0),
(42, '/class/Machine Learning/Chapter 2.1-Linear Regression_ok.pdf', '29-12-2021_23-43-9', 0),
(42, '/class/Machine Learning/Chapter 2.2-Overfitting_ok.pdf', '29-12-2021_23-43-9', 0),
(42, '/class/Machine Learning/Chapter 3.1-Clustering_ok.pdf', '29-12-2021_23-43-9', 0),
(42, '/class/Machine Learning/Chapter 3.2-KNN_ok.pdf', '29-12-2021_23-43-9', 0),
(42, '/class/Machine Learning/Chapter 4.1-Gradient Descent_ok.pdf', '29-12-2021_23-43-9', 0),
(42, '/class/Machine Learning/Chapter 4.2-Perceptron Learning Algorithm_ok.pdf', '29-12-2021_23-43-9', 0),
(42, '/class/Machine Learning/Chapter 5.1-ID3_ok.pdf', '29-12-2021_23-43-9', 0),
(42, '/class/Machine Learning/Chapter 5.2-Cart_ok.pdf', '29-12-2021_23-43-9', 0),
(42, '/class/Machine Learning/Chapter 6.1-Hoi quy logistic_ok.pdf', '29-12-2021_23-43-9', 0),
(42, '/class/Machine Learning/Chapter 6.2-SVM_ok.pdf', '29-12-2021_23-43-9', 0),
(42, '/class/Machine Learning/Chapter 7-Ensemble learning_ok.pdf', '29-12-2021_23-43-9', 0),
(48, '/class/Kiểm thử/Cac ky thuat kiem thu phan mem.pdf', '21-1-2022_4-20-52', 0),
(48, '/class/Kiểm thử/Cac ky thuat kiem thu phan mem(tiep).pdf', '21-1-2022_4-20-52', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `class` int(11) NOT NULL,
  `ten_bai_kiem_tra` varchar(255) NOT NULL,
  `noi_dung` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `ngay_tao` text NOT NULL,
  `luot_lam_bai` int(11) NOT NULL,
  `thoi_gian_lam_bai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `test`
--

INSERT INTO `test` (`id`, `class`, `ten_bai_kiem_tra`, `noi_dung`, `ngay_tao`, `luot_lam_bai`, `thoi_gian_lam_bai`) VALUES
(6, 42, 'Bài kiểm tra test 1', '[{\"cau_hoi\":\"Javascript is _________ language.\",\"a\":\"Programming\",\"b\":\"Application\",\"c\":\"None of These\",\"d\":\"Scripting\",\"dap_an_dung\":\"d\"},{\"cau_hoi\":\"Which of the following is a valid type of function javascript supports?\",\"a\":\"named function\",\"b\":\"anonymous function\",\"c\":\"both of the above\",\"d\":\"none of the above\",\"dap_an_dung\":\"c\"},{\"cau_hoi\":\"Which built-in method returns the index within the calling String object of the st occurrence of the specified value ?\",\"a\":\"getIndex()\",\"b\":\"location()\",\"c\":\"indexOf()\",\"d\":\"getLocation()\",\"dap_an_dung\":\"c\"},{\"cau_hoi\":\"Which one of the following is valid data type of JavaScript\",\"a\":\"number\",\"b\":\"void\",\"c\":\"boolean\",\"d\":\"nothing\",\"dap_an_dung\":\"c\"}]', '30/12/2021 - 3:35:57', 1, 15),
(7, 42, 'Bài kiểm tra test 2 sửa', '[{\"cau_hoi\":\"Javascript is _________ language.\",\"a\":\"Programming\",\"b\":\"Application\",\"c\":\"None of These\",\"d\":\"Scripting\",\"dap_an_dung\":\"d\"},{\"cau_hoi\":\"Which of the following is a valid type of function javascript supports?\",\"a\":\"named function\",\"b\":\"anonymous function\",\"c\":\"both of the above\",\"d\":\"none of the above\",\"dap_an_dung\":\"c\"},{\"cau_hoi\":\"Which built-in method returns the index within the calling String object of the st occurrence of the specified value ?\",\"a\":\"getIndex()\",\"b\":\"location()\",\"c\":\"indexOf()\",\"d\":\"getLocation()\",\"dap_an_dung\":\"c\"},{\"cau_hoi\":\"Which one of the following is valid data type of JavaScript\",\"a\":\"number\",\"b\":\"void\",\"c\":\"boolean\",\"d\":\"nothing\",\"dap_an_dung\":\"c\"},{\"cau_hoi\":\"1\",\"a\":\"2\",\"b\":\"3\",\"c\":\"4\",\"d\":\"5\",\"dap_an_dung\":\"a\"}]', '30/12/2021 - 3:51:32', 5, 20);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `testresult`
--

CREATE TABLE `testresult` (
  `id_test` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `ket_qua` float NOT NULL,
  `ngay_lam` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `testresult`
--

INSERT INTO `testresult` (`id_test`, `id_user`, `ket_qua`, `ngay_lam`) VALUES
(6, 20, 10, '30/12/2021 - 3:47:13');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `ten_dang_nhap` varchar(50) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `ten` varchar(255) NOT NULL,
  `vai_tro` int(11) NOT NULL,
  `anh_dai_dien` text NOT NULL,
  `tom_tat` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `ten_dang_nhap`, `mat_khau`, `email`, `ten`, `vai_tro`, `anh_dai_dien`, `tom_tat`) VALUES
(1, 'kiuen123', 'Kien121999', 'kien121999121999@gmail.com', 'Kiên Admin', 1, '/uploads/kiuen123/kiuen123-24-12-2021_18-49-15.jpg', 'admin'),
(19, 'kiennt01', 'Kien121999', 'kien@kien.kien', 'Kiên Giáo Viên', 3, '/uploads/kiennt01/kiennt01-20-1-2022_6-52-17.jpg', 'Giáo Viên'),
(20, 'kiennt02', 'Kien121999', 'kien2@kien.kien', 'Kiên Học Sinh', 2, '/uploads/default/user.png ', 'Học Sinh'),
(21, 'datdt01', '123456', 'datdt01@gmail.com', 'Dương Tiến Đạt', 2, '/uploads/default/user.png', ''),
(22, 'chien01', '123456', 'chien01@gmail.com', 'Nguyễn Văn Chiến', 2, '/uploads/default/user.png', ''),
(23, 'bachdv1', '123456', 'bachdv1@gmail.com', 'Đỗ Văn Bách', 2, '/uploads/default/user.png', ''),
(24, 'hattt01', '123456', 'hattt01@gmail.com', 'Trần Thị Thu Hà', 2, '/uploads/default/user.png', ''),
(25, 'ledvh01', '123456', 'ledvh01@gmail.com', 'Đỗ Vũ Hoa Lê', 2, '/uploads/default/user.png', ''),
(26, 'hoang01', '123456', 'datdt01@gmail.com', 'Nguyễn Huy Hoàng', 2, '/uploads/default/user.png', ''),
(27, 'khangnt01', '123456', 'khangnt01@gmail.com', 'Nguyễn Thành Khang ', 2, '/uploads/default/user.png ', ' '),
(28, 'linhnt01', '123456', 'linhnt01@gmail.com', 'Nguyễn Thùy Linh ', 3, '/uploads/default/user.png ', ' '),
(29, 'linhnt02', '123456', 'linhnt02@gmail.com', 'Nguyễn Thùy Linh ', 2, '/uploads/default/user.png ', ' '),
(30, 'huyvv01', '123456', 'huyvv01@gmail.com', 'Vũ Văn Huy ', 2, '/uploads/default/user.png ', ' '),
(31, 'lidv01', '123456', 'lidv01@gmail.com', 'Dương Văn Li ', 2, '/uploads/default/user.png ', ' '),
(32, 'linhdh01', '123456', 'linhdh01@gmail.com', 'Dương Hoàng Linh ', 2, '/uploads/default/user.png ', ' '),
(33, 'khanhnq0209', '292004', 'khanhnq0209@gmail.com', 'Nguyễn Quốc Khánh ', 2, '/uploads/default/user.png ', ' '),
(34, 'hangdt01', '123456', 'hangdt01@gmail.com', 'Dương Thúy Hằng ', 2, '/uploads/default/user.png ', ' '),
(35, 'uyen01', '123456', 'uyen01@gmail.com', 'Uyên ', 2, '/uploads/default/user.png ', ' '),
(36, 'datdt02', '123456', 'datdt02@gmail.com', 'Dương Tiến Đạt', 2, '/uploads/default/user.png', ''),
(37, 'chien02', '123456', 'chien02@gmail.com', 'Nguyễn Văn Chiến', 2, '/uploads/default/user.png', ''),
(38, 'bachdv2', '123456', 'bachdv2@gmail.com', 'Đỗ Văn Bách', 2, '/uploads/default/user.png', ''),
(39, 'hattt02', '123456', 'hattt02@gmail.com', 'Trần Thị Thu Hà', 2, '/uploads/default/user.png', ''),
(40, 'ledvh02', '123456', 'ledvh02@gmail.com', 'Đỗ Vũ Hoa Lê', 2, '/uploads/default/user.png', ''),
(41, 'hoang02', '123456', 'datdt02@gmail.com', 'Nguyễn Huy Hoàng', 2, '/uploads/default/user.png', ''),
(42, 'datdt03', '123456', 'datdt03@gmail.com', 'Dương Tiến Đạt', 2, '/uploads/default/user.png', ''),
(43, 'chien03', '123456', 'chien03@gmail.com', 'Nguyễn Văn Chiến', 2, '/uploads/default/user.png', ''),
(44, 'bachdv3', '123456', 'bachdv3@gmail.com', 'Đỗ Văn Bách', 2, '/uploads/default/user.png', ''),
(45, 'hattt03', '123456', 'hattt03@gmail.com', 'Trần Thị Thu Hà', 2, '/uploads/default/user.png', ''),
(46, 'ledvh03', '123456', 'ledvh03@gmail.com', 'Đỗ Vũ Hoa Lê', 2, '/uploads/default/user.png', ''),
(47, 'hoang03', '123456', 'datdt03@gmail.com', 'Nguyễn Huy Hoàng', 2, '/uploads/default/user.png', ''),
(48, 'datdt04', '123456', 'datdt04@gmail.com', 'Dương Tiến Đạt', 2, '/uploads/default/user.png', ''),
(49, 'chien04', '123456', 'chien04@gmail.com', 'Nguyễn Văn Chiến', 2, '/uploads/default/user.png', ''),
(50, 'bachdv4', '123456', 'bachdv4@gmail.com', 'Đỗ Văn Bách', 2, '/uploads/default/user.png', ''),
(51, 'hattt04', '123456', 'hattt04@gmail.com', 'Trần Thị Thu Hà', 2, '/uploads/default/user.png', ''),
(52, 'ledvh04', '123456', 'ledvh04@gmail.com', 'Đỗ Vũ Hoa Lê', 2, '/uploads/default/user.png', ''),
(53, 'hoang04', '123456', 'datdt04@gmail.com', 'Nguyễn Huy Hoàng', 2, '/uploads/default/user.png', '');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `carepost`
--
ALTER TABLE `carepost`
  ADD PRIMARY KEY (`user`,`post`),
  ADD KEY `postcare` (`post`);

--
-- Chỉ mục cho bảng `checklist`
--
ALTER TABLE `checklist`
  ADD PRIMARY KEY (`id`,`user`);

--
-- Chỉ mục cho bảng `checkpoint`
--
ALTER TABLE `checkpoint`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class5` (`class`);

--
-- Chỉ mục cho bảng `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class` (`giao_vien`);

--
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vietcmt` (`nguoi_viet`),
  ADD KEY `baiviet` (`bai_viet`);

--
-- Chỉ mục cho bảng `learn`
--
ALTER TABLE `learn`
  ADD PRIMARY KEY (`class`,`student`),
  ADD KEY `class1` (`class`),
  ADD KEY `user1` (`student`);

--
-- Chỉ mục cho bảng `learntime`
--
ALTER TABLE `learntime`
  ADD KEY `class6` (`id`);

--
-- Chỉ mục cho bảng `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vietbai` (`nguoi_viet`),
  ADD KEY `classbai` (`class`);

--
-- Chỉ mục cho bảng `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `store`
--
ALTER TABLE `store`
  ADD KEY `classa` (`class`);

--
-- Chỉ mục cho bảng `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class4` (`class`);

--
-- Chỉ mục cho bảng `testresult`
--
ALTER TABLE `testresult`
  ADD PRIMARY KEY (`id_test`,`id_user`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role` (`vai_tro`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `checkpoint`
--
ALTER TABLE `checkpoint`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `class`
--
ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT cho bảng `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `carepost`
--
ALTER TABLE `carepost`
  ADD CONSTRAINT `postcare` FOREIGN KEY (`post`) REFERENCES `post` (`id`),
  ADD CONSTRAINT `usercare` FOREIGN KEY (`user`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `checklist`
--
ALTER TABLE `checklist`
  ADD CONSTRAINT `điemanh` FOREIGN KEY (`id`) REFERENCES `checkpoint` (`id`);

--
-- Các ràng buộc cho bảng `checkpoint`
--
ALTER TABLE `checkpoint`
  ADD CONSTRAINT `class5` FOREIGN KEY (`class`) REFERENCES `class` (`id`);

--
-- Các ràng buộc cho bảng `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class` FOREIGN KEY (`giao_vien`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `baiviet` FOREIGN KEY (`bai_viet`) REFERENCES `post` (`id`),
  ADD CONSTRAINT `vietcmt` FOREIGN KEY (`nguoi_viet`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `learn`
--
ALTER TABLE `learn`
  ADD CONSTRAINT `class1` FOREIGN KEY (`class`) REFERENCES `class` (`id`),
  ADD CONSTRAINT `user1` FOREIGN KEY (`student`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `learntime`
--
ALTER TABLE `learntime`
  ADD CONSTRAINT `class6` FOREIGN KEY (`id`) REFERENCES `class` (`id`);

--
-- Các ràng buộc cho bảng `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `classbai` FOREIGN KEY (`class`) REFERENCES `class` (`id`),
  ADD CONSTRAINT `vietbai` FOREIGN KEY (`nguoi_viet`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `store`
--
ALTER TABLE `store`
  ADD CONSTRAINT `classa` FOREIGN KEY (`class`) REFERENCES `class` (`id`);

--
-- Các ràng buộc cho bảng `test`
--
ALTER TABLE `test`
  ADD CONSTRAINT `class4` FOREIGN KEY (`class`) REFERENCES `class` (`id`);

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `role` FOREIGN KEY (`vai_tro`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
