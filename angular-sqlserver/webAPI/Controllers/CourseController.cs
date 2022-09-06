using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using webAPI.Model;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public CourseController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("GetAllCourse")]
        public JsonResult GetAllUser()
        {
            // query + connection
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            string query = "select course.id as id_course, course.ten_lop as ten_lop, " +
                "course.ngay_bat_dau as ngay_bat_dau, course.ngay_ket_thuc as ngay_ket_thuc," +
                "count(class.id_users) as so_thanh_vien " +
                "from course,class " +
                "where course.id = class.id_course " +
                "group by course.id, course.ten_lop, course.ngay_bat_dau, course.ngay_ket_thuc";

            // log
            WriteLog writeLog = new WriteLog();
            writeLog.wirte(query);

            // execute
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                SqlCommand nyCommand = new SqlCommand(query, myCon);

                // res return
                DataTable table = new DataTable();
                string error_messages = "";

                try
                {
                    myCon.Open();
                    table.Load(nyCommand.ExecuteReader());
                    return new JsonResult(table);
                }
                catch (SqlException ex)
                {
                    for (int i = 0; i < ex.Errors.Count; i++)
                    {
                        error_messages += ex.Errors[i].Message;
                    }
                    return new JsonResult("error_messages :" + error_messages);
                }
                catch (Exception ex)
                {
                    error_messages = ex.Message;
                    return new JsonResult("error_messages :" + error_messages);
                }
            }
        }

        [HttpGet("GetCoursebyId")]
        public JsonResult GetUserbyId(int id)
        {
            // query + connection
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            string query = "select course.id as id_course, course.ten_lop as ten_lop, " +
                "course.ngay_bat_dau as ngay_bat_dau, course.ngay_ket_thuc as ngay_ket_thuc," +
                "users.ten as giao_vien, course.link_online as link_online, count(class.id_users) as so_thanh_vien " +
                "from course,class,users " +
                "where course.id = class.id_course " + " and class.id_users = users.id and course.id = " + id +
                "group by course.id, course.ten_lop, course.ngay_bat_dau, course.ngay_ket_thuc, course.link_online, users.ten";

            // log
            WriteLog writeLog = new WriteLog();
            writeLog.wirte(query);

            // execute
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                SqlCommand nyCommand = new SqlCommand(query, myCon);

                // res return
                DataTable table = new DataTable();
                string error_messages = "";

                try
                {
                    myCon.Open();
                    table.Load(nyCommand.ExecuteReader());
                    return new JsonResult(table);
                }
                catch (SqlException ex)
                {
                    for (int i = 0; i < ex.Errors.Count; i++)
                    {
                        error_messages += ex.Errors[i].Message;
                    }
                    return new JsonResult("error_messages :" + error_messages);
                }
                catch (Exception ex)
                {
                    error_messages = ex.Message;
                    return new JsonResult("error_messages :" + error_messages);
                }
            }
        }

        [HttpGet("SearchCourse")]
        public JsonResult SearchUser(string colum, string content, int CurentPage, int PageLength)
        {
            // convert colum to sql syntax
            if (colum == "id") colum = "course.id";
            if (colum == "ten_lop") colum = "course.ten_lop";
            if (colum == "giao_vien") colum = "users.ten";

            // query + connection
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            string query = "select course.id as id_course, course.ten_lop as ten_lop, course.ngay_bat_dau as ngay_bat_dau, course.ngay_ket_thuc as ngay_ket_thuc, " +
                "users.ten as giao_vien, course.link_online as link_online, count(class.id_users) as so_thanh_vien " +
                "from course,class,users " +
                "where course.id = class.id_course and class.id_users = users.id and " + colum + " like '%" + content + "%' " +
                "group by course.id, course.ten_lop, course.ngay_bat_dau, course.ngay_ket_thuc, course.link_online, users.ten " +
                "ORDER BY course.id OFFSET " + CurentPage * PageLength + " ROWS FETCH NEXT " + PageLength + " ROWS ONLY";
            
            // log
            WriteLog writeLog = new WriteLog();
            writeLog.wirte(query);

            // execute
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                SqlCommand nyCommand = new SqlCommand(query, myCon);

                // res return
                DataTable table = new DataTable();
                string error_messages = "";

                try {
                    myCon.Open();
                    table.Load(nyCommand.ExecuteReader());
                    return new JsonResult(table);
                }
                catch (SqlException ex)
                {
                    for (int i = 0; i < ex.Errors.Count; i++)
                    {
                        error_messages += ex.Errors[i].Message;
                    }
                    return new JsonResult("error_messages :" + error_messages);
                }
                catch (Exception ex)
                {
                    error_messages = ex.Message;
                    return new JsonResult("error_messages :" + error_messages);
                }
            }
        }

        [HttpGet("GetCourseName")]
        public JsonResult GetCourseName(String coursename)
        {
            // query + connection
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            string query = "select count(course.ten_lop) as so_luong_trung from course where ten_lop = '" + coursename + "'";
            
            // log
            WriteLog writeLog = new WriteLog();
            writeLog.wirte(query);

            // execute
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                SqlCommand nyCommand = new SqlCommand(query, myCon);

                // res return
                DataTable table = new DataTable();
                string error_messages = "";

                try
                {
                    myCon.Open();
                    table.Load(nyCommand.ExecuteReader());
                    return new JsonResult(table);
                }
                catch (SqlException ex)
                {
                    for (int i = 0; i < ex.Errors.Count; i++)
                    {
                        error_messages += ex.Errors[i].Message;
                    }
                    return new JsonResult("error_messages :" + error_messages);
                }
                catch (Exception ex)
                {
                    error_messages = ex.Message;
                    return new JsonResult("error_messages :" + error_messages);
                }
            }
        }

        [HttpPost("AddCourse")]
        public JsonResult AddUserbyId(CourseAdd courseAdd)
        {
            // query + connection
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            string query = "insert into course ( ten_lop, ngay_bat_dau, ngay_ket_thuc, link_online) " +
                "VALUES ( N'"+ courseAdd.ten_lop + "', '"+ courseAdd.ngay_bat_dau + "', '"+ courseAdd.ngay_ket_thuc + "', N'"+ courseAdd.link_online + "') " +
                "INSERT INTO class( id_course, id_users, teacher) " +
                "VALUES ( (select course.id from course where course.ten_lop = N'" + courseAdd.ten_lop + "' ORDER BY course.id DESC OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY  ), " + courseAdd.teacher_id + ", 1)";
            
            // log
            WriteLog writeLog = new WriteLog();
            writeLog.wirte(query);

            // Execute
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                SqlCommand nyCommand = new SqlCommand(query, myCon);

                // res return
                string error_messages = "";
                int rows_affected = 0;

                try
                {
                    myCon.Open();
                    rows_affected = nyCommand.ExecuteNonQuery();
                    return new JsonResult("rows_affected :" + rows_affected);
                }
                catch(SqlException ex) {
                    for (int i = 0; i < ex.Errors.Count; i++)
                    {
                        error_messages += ex.Errors[i].Message;
                    }
                    return new JsonResult("error_messages :" + error_messages);
                }
                catch (Exception ex) {
                    error_messages = ex.Message; 
                    return new JsonResult("error_messages :" + error_messages);
                }
            }
        }
    }
}
