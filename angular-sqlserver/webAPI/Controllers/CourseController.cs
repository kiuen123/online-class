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
            string query = "select course.id as id_course, course.ten_lop as ten_lop, " +
                "course.ngay_bat_dau as ngay_bat_dau, course.ngay_ket_thuc as ngay_ket_thuc," +
                "count(class.id_users) as so_thanh_vien " +
                "from course,class " +
                "where course.id = class.id_course " +
                "group by course.id, course.ten_lop, course.ngay_bat_dau, course.ngay_ket_thuc";
            WriteLog writeLog = new WriteLog();
            writeLog.wirte(query);
            DataTable table = new DataTable();
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand nyCommand = new SqlCommand(query, myCon))
                {
                    myReader = nyCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpGet("GetCoursebyId")]
        public JsonResult GetUserbyId(int id)
        {
            string query = "select course.id as id_course, course.ten_lop as ten_lop, " +
                "course.ngay_bat_dau as ngay_bat_dau, course.ngay_ket_thuc as ngay_ket_thuc," +
                "users.ten as giao_vien, course.link_online as link_online, count(class.id_users) as so_thanh_vien " +
                "from course,class,users " +
                "where course.id = class.id_course " + " and class.id_users = users.id and course.id = " + id +
                "group by course.id, course.ten_lop, course.ngay_bat_dau, course.ngay_ket_thuc, course.link_online, users.ten";
            WriteLog writeLog = new WriteLog();
            writeLog.wirte(query);
            DataTable table = new DataTable();
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand nyCommand = new SqlCommand(query, myCon))
                {
                    myReader = nyCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpGet("SearchCourse")]
        public JsonResult SearchUser(string colum, string content, int CurentPage, int PageLength)
        {
            // convert colum to sql syntax
            if (colum == "id") colum = "course.id";
            if (colum == "ten_lop") colum = "course.ten_lop";
            if (colum == "giao_vien") colum = "users.ten";

            string query = "select course.id as id_course, course.ten_lop as ten_lop, course.ngay_bat_dau as ngay_bat_dau, course.ngay_ket_thuc as ngay_ket_thuc, " +
                "users.ten as giao_vien, course.link_online as link_online, count(class.id_users) as so_thanh_vien " +
                "from course,class,users " +
                "where course.id = class.id_course and class.id_users = users.id and " + colum + " like '%" + content + "%' " +
                "group by course.id, course.ten_lop, course.ngay_bat_dau, course.ngay_ket_thuc, course.link_online, users.ten " +
                "ORDER BY course.id OFFSET " + CurentPage * PageLength + " ROWS FETCH NEXT " + PageLength + " ROWS ONLY";
            WriteLog writeLog = new WriteLog();
            writeLog.wirte(query);
            DataTable table = new DataTable();
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand nyCommand = new SqlCommand(query, myCon))
                {
                    myReader = nyCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
    }
}
