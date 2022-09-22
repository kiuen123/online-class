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
            string query = "exec danh_sach_course " +
                 " @sql = ''," +
                 " @pagination =''";

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
            string query = "exec danh_sach_course " +
                 " @sql = ' and course.id = " + id + " '," +
                 " @pagination =' '";

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

        [HttpGet("getCourseUsersList")]
        public JsonResult getCourseUsersList(int id, int CurentPage, int PageLength)
        {
            // query + connection
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            string query = "exec danh_sach_lop @sql = ' and course.id = "+ id+ " '," + 
                " @pagination =' ORDER BY course.id OFFSET " + CurentPage * PageLength + " ROWS FETCH NEXT " + PageLength + " ROWS ONLY'";

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
            String _sql = "";
            // convert colum to sql syntax
            switch (colum) {
                case "id":
                    if (content == "%")
                        _sql = "";
                    else
                        _sql = " and course.id =  " + content ;
                break;
                case "ten_lop":
                    _sql = " and course.ten_lop like N''%" + content + "%''";
                break;
                case "giao_vien":
                    _sql = " and users.ten like N''%" + content + "%''";
                break;
                default:
                    _sql = " ";
                break;
            }
                
            // query + connection
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            string query = "exec danh_sach_course " +
                " @sql = '" + _sql + " ',"+
                " @pagination =' ORDER BY course.id OFFSET " + CurentPage * PageLength + " ROWS FETCH NEXT " + PageLength + " ROWS ONLY'";
            
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


        [HttpGet("getCourseLearnTime")]
        public JsonResult getCourseLearnTime(int courseid)
        {
            // query + connection
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            string query = "select * from learntime where id_course="+courseid;

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
    }
}
