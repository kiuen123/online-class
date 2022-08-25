
create database kteachlab;

use kteachlab;

/*bảng user*/
CREATE TABLE users
(
  id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  ten_dang_nhap varchar(50) NOT NULL,
  mat_khau varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  ten nvarchar(255) NOT NULL,
  vai_tro varchar(255) NOT NULL,
  anh_dai_dien ntext NOT NULL,
  tom_tat ntext NOT NULL
)

INSERT INTO users
  ( ten_dang_nhap, mat_khau, email, ten, vai_tro, anh_dai_dien, tom_tat)
VALUES
  ( 'kiuen123', 'Kien121999', 'kien121999121999@gmail.com', N'Kiên Admin', 'admin', '', N'admin'),
  ( 'kiennt01', 'Kien121999', 'kien@kien.kien', N'Kiên Giáo Viên', 'teacher', '', N'Giáo Viên'),
  ( 'kiennt02', 'Kien121999', 'kien2@kien.kien', N'Kiên Học Sinh', 'student', '', N'Học Sinh'),
  ( 'datdt01', '123456', 'datdt01@gmail.com', N'Dương Tiến Đạt', 'student', '', N''),
  ( 'chien01', '123456', 'chien01@gmail.com', N'Nguyễn Văn Chiến', 'student', '', N''),
  ( 'bachdv1', '123456', 'bachdv1@gmail.com', N'Đỗ Văn Bách', 'student', '', N''),
  ( 'hattt01', '123456', 'hattt01@gmail.com', N'Trần Thị Thu Hà', 'student', '', N''),
  ( 'ledvh01', '123456', 'ledvh01@gmail.com', N'Đỗ Vũ Hoa Lê', 'student', '', N''),
  ( 'hoang01', '123456', 'datdt01@gmail.com', N'Nguyễn Huy Hoàng', 'student', '', N''),
  ( 'khangnt01', '123456', 'khangnt01@gmail.com', N'Nguyễn Thành Khang ', 'student', '', N''),
  ( 'linhnt01', '123456', 'linhnt01@gmail.com', N'Nguyễn Thùy Linh ', 'student', '', N''),
  ( 'linhnt02', '123456', 'linhnt02@gmail.com', N'Nguyễn Thùy Linh ', 'student', '', N''),
  ( 'huyvv01', '123456', 'huyvv01@gmail.com', N'Vũ Văn Huy ', 'student', '', N''),
  ( 'lidv01', '123456', 'lidv01@gmail.com', N'Dương Văn Li ', 'student', '', N''),
  ( 'linhdh01', '123456', 'linhdh01@gmail.com', N'Dương Hoàng Linh ', 'student', '', N''),
  ('khanhnq0209', '292004', 'khanhnq0209@gmail.com', N'Nguyễn Quốc Khánh ', 'student', '', N''),
  ( 'hangdt01', '123456', 'hangdt01@gmail.com', N'Dương Thúy Hằng ', 'student', '', N''),
  ( 'uyen01', '123456', 'uyen01@gmail.com', N'Uyên ', 'student', '', N''),
  ( 'datdt02', '123456', 'datdt02@gmail.com', N'Dương Tiến Đạt', 'student', '', N''),
  ( 'chien02', '123456', 'chien02@gmail.com', N'Nguyễn Văn Chiến', 'student', '', N''),
  ( 'bachdv2', '123456', 'bachdv2@gmail.com', N'Đỗ Văn Bách', 'student', '', N''),
  ( 'hattt02', '123456', 'hattt02@gmail.com', N'Trần Thị Thu Hà', 'student', '', N''),
  ( 'ledvh02', '123456', 'ledvh02@gmail.com', N'Đỗ Vũ Hoa Lê', 'student', '', N''),
  ( 'hoang02', '123456', 'datdt02@gmail.com', N'Nguyễn Huy Hoàng', 'student', '', N''),
  ( 'datdt03', '123456', 'datdt03@gmail.com', N'Dương Tiến Đạt', 'student', '', N''),
  ( 'chien03', '123456', 'chien03@gmail.com', N'Nguyễn Văn Chiến', 'student', '', N''),
  ( 'bachdv3', '123456', 'bachdv3@gmail.com', N'Đỗ Văn Bách', 'student', '', N''),
  ( 'hattt03', '123456', 'hattt03@gmail.com', N'Trần Thị Thu Hà', 'student', '', N''),
  ( 'ledvh03', '123456', 'ledvh03@gmail.com', N'Đỗ Vũ Hoa Lê', 'student', '', N''),
  ( 'hoang03', '123456', 'datdt03@gmail.com', N'Nguyễn Huy Hoàng', 'student', '', N''),
  ( 'datdt04', '123456', 'datdt04@gmail.com', N'Dương Tiến Đạt', 'student', '', N''),
  ( 'chien04', '123456', 'chien04@gmail.com', N'Nguyễn Văn Chiến', 'student', '', N''),
  ( 'bachdv4', '123456', 'bachdv4@gmail.com', N'Đỗ Văn Bách', 'student', '', N''),
  ( 'hattt04', '123456', 'hattt04@gmail.com', N'Trần Thị Thu Hà', 'student', '', N''),
  ( 'ledvh04', '123456', 'ledvh04@gmail.com', N'Đỗ Vũ Hoa Lê', 'student', '', N''),
  ( 'hoang04', '123456', 'datdt04@gmail.com', N'Nguyễn Huy Hoàng', 'student', '', N'');

/*bảng course*/
CREATE TABLE course
(
  id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  ten_lop nvarchar(255) NOT NULL,
  ngay_bat_dau date NOT NULL,
  ngay_ket_thuc date NOT NULL,
  link_online ntext NOT NULL
)

INSERT INTO course
  ( ten_lop, ngay_bat_dau, ngay_ket_thuc, link_online)
VALUES
  ( N'Machine Learning', '2021-12-11', '2022-1-20', N''),
  ( N'Web3D', '2021-12-11', '2022-1-20', N''),
  ( N'android', '2021-12-11', '2022-1-20', N''),
  ( N'Cơ sở dữ liệu', '2021-12-11', '2022-1-20', N''),
  ( N'Khai phá dữ liệu', '2021-12-11', '2022-1-20', N''),
  ( N'Kiểm thử', '2021-12-11', '2022-1-20', N''),
  ( N'lập trình phân tán', '2021-12-11', '2022-1-20', N''),
  ( N'Linux và phần mềm mã nguồn mở', '2021-12-11', '2022-1-20', N''),
  ( N'Phát triển dự án', '2021-12-11', '2022-1-20', N''),
  ( N'Ngôn ngữ lập trình', '2021-12-11', '2022-1-20', N''),
  ( N'Toán rời rạc', '2021-12-11', '2022-1-20', N''),
  ( N'Xác suất thống kê', '2021-12-11', '2022-1-20', N''),
  ( N'Mạng máy tính', '2021-12-11', '2022-1-20', N''),
  ( N'Machine Learning 02', '2021-12-11', '2022-1-20', N''),
  ( N'Machine Learning 03', '2021-12-11', '2022-1-20', N'');

/*bảng class*/
CREATE TABLE class
(
  id_course int NOT NULL,
  id_users int NOT NULL,
  teacher bit NOT NULL,
)

alter table class
add constraint class_course
foreign key (id_course)
references course(id)

alter table class
add constraint class_users
foreign key (id_users)
references users(id)

/*bảng thời gian học*/
CREATE TABLE learntime
(
  id_course int NOT NULL,
  weekend_day varchar(255) NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
)

alter table learntime
add constraint learntime_course
foreign key (id_course)
references course(id)

/*mã điểm danh*/
CREATE TABLE checkcode
(
  id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  id_course int NOT NULL,
  code varchar(255) NOT NULL,
  ngay date NOT NULL,
  time_start time NOT NULL,
  time_wait int NOT NULL,
  num_of_check int NOT NULL,
)

alter table checkcode
add constraint checkcode_course
foreign key (id_course)
references course(id)

/*bảng điểm danh*/
CREATE TABLE checkin
(
  id_checkcode int NOT NULL,
  id_users int NOT NULL,
  time_checkin datetime NOT NULL,
)

alter table checkin
add constraint checkin_checkcode
foreign key (id_checkcode)
references checkcode(id)

alter table checkin
add constraint checkin_users
foreign key (id_users)
references users(id)

/*bảng test*/
CREATE TABLE test
(
  id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  id_course int NOT NULL,
  test_name nvarchar(255),
  ngay_tao datetime NOT NULL,
  ngaygio_lam_test datetime NOT NULL,
  time_wait int NOT NULL,
  time_test int NOT NULL,
  num_of_tested int NOT NULL,
)

alter table test
add constraint test_course
foreign key (id_course)
references course(id)

/*test result*/
CREATE TABLE testresult
(
  id_test int NOT NULL,
  id_users int NOT NULL,
  time_start datetime NOT NULL,
  time_test int NOT NULL,
  result int NOT NULL,
)

alter table testresult
add constraint testresult_test
foreign key (id_test)
references test(id)

alter table testresult
add constraint testresult_users
foreign key (id_users)
references users(id)

/*bảng store*/
CREATE TABLE store
(
  id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  id_course int NOT NULL,
  title varchar(255) NOT NULL,
  link_store ntext NOT NULL,
  ngaygio_dang datetime NOT NULL,
  num_of_view int NOT NULL,
)

alter table store
add constraint store_class
foreign key (id_course)
references course(id)

/*bảng post*/
CREATE TABLE post
(
  id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  id_tacgia int NOT NULL,
  id_course int NOT NULL,
  title varchar(255) NOT NULL,
  content ntext NOT NULL,
  ngaygio_dang datetime NOT NULL
)

alter table post
add constraint post_tacgia
foreign key (id_tacgia)
references users(id)

alter table post
add constraint post_course
foreign key (id_course)
references course(id)

/*bảng comment*/
CREATE TABLE comment
(
  id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  id_post int NOT NULL,
  id_users int NOT NULL,
  content ntext NOT NULL,
  ngay_dang datetime NOT NULL
)

alter table comment
add constraint comment_post
foreign key (id_post)
references post(id)

alter table comment
add constraint comment_users
foreign key (id_users)
references users(id)

drop database kteachlab;

/*test query*/
SELECT * FROM users ORDER BY id OFFSET 0*10 ROWS FETCH NEXT 10 ROWS ONLY;
update users set email = 'khangnt01@gmail.com', ten = N'Nguyễn Thành Khang', anh_dai_dien = 'a', tom_tat = N'a' where id = 10
delete users where id = 4
INSERT INTO users
  ( ten_dang_nhap, mat_khau, email, ten, vai_tro, anh_dai_dien, tom_tat)
VALUES
  ( 'datdt01', '123456', 'datdt01@gmail.com', N'Dương Tiến Đạt', 'student', '', N'')