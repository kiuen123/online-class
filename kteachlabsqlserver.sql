
create database kteachlab;

use kteachlab;

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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

go
create trigger ko_xoa_admin on users
instead of delete as 
if (select count(*) from users, deleted where users.vai_tro = deleted.vai_tro and users.vai_tro= 'admin') > 0
begin
	print N'ko xóa admin'
	Rollback tran
end

drop trigger ko_xoa_admin

delete from users where id = 1

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
  
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*bảng course*/
CREATE TABLE course
(
  id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  ten_lop nvarchar(255) NOT NULL,
  ngay_bat_dau date NOT NULL,
  ngay_ket_thuc date NOT NULL,
  link_online nvarchar(255) NOT NULL
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
  
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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

go
create trigger ten_course_trung on course
for insert as
IF (SELECT count(*) FROM course,inserted WHERE course.ten_lop = inserted.ten_lop ) > 1
begin
	print N'Tên course bị trùng'
	Rollback tran
end

DROP TRIGGER ten_course_trung


INSERT INTO class( id_course, id_users, teacher)
VALUES 
	( 1, 2, 1),
	( 2, 2, 1),
	( 3, 2, 1),
	( 4, 2, 1),
	( 5, 2, 1),
	( 6, 2, 1),
	( 7, 2, 1),
	( 8, 2, 1),
	( 9, 2, 1),
	( 10, 2, 1),
	( 11, 2, 1),
	( 12, 2, 1),
	( 13, 2, 1),
	( 14, 2, 1),
	( 15, 2, 1)
	
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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

/* drop database kteachlab; */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/* procedure lấy danh sách lớp */
go
create procedure danh_sach_lop
(
	@sql as nvarchar(max),
	@pagination as nvarchar(max)
)
as
begin
	declare @query nvarchar(1000) 
	set @query = 'select users.ten, users.email, users.anh_dai_dien, users.vai_tro, class.teacher 
	from course, users, class 
	where course.id = class.id_course and users.id = class.id_users '
	+ @sql
	+ @pagination
	exec (@query)
end

drop proc danh_sach_lop

exec danh_sach_lop 
@sql = ' and course.id = 1 ',
@pagination = ' order by course.id offset 0*10 row fetch next 10 rows only '
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/* view đếm số thành viên trong khóa học */
create view so_thanh_vien 
as 
select class.id_course as id_course, count(class.id_users) as so_thanh_vien from class group by class.id_course

/* procedure lấy danh sách khóa học */
go
create procedure danh_sach_course
(
	@sql as nvarchar(max),
	@pagination as nvarchar(max)
)
as
begin
	declare @query nvarchar(1000) 
	set @query = 'select  course.id as id_course, course.ten_lop as ten_lop, course.ngay_bat_dau as ngay_bat_dau, course.ngay_ket_thuc as ngay_ket_thuc, users.ten as giao_vien, 
	course.link_online as link_online, so_thanh_vien.so_thanh_vien
	from  course,so_thanh_vien,class,users
	where course.id = so_thanh_vien.id_course and course.id = class.id_course and class.id_users = users.id and class.teacher = 1 '
	/* content */
	+ @sql
	+ @pagination
	exec (@query)
end

/* drop proc danh_sach_course */

exec danh_sach_course
@sql = ' and course.ten_lop like N''%Ma%'' ',
@pagination = ' order by course.id offset 0*10 row fetch next 10 rows only '
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
