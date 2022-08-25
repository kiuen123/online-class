using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using webAPI.Model;
using static System.Net.Mime.MediaTypeNames;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("GetAllUser")]
        public JsonResult GetAllUser()
        {
            string query = "select id,ten,email,vai_tro,anh_dai_dien,tom_tat from users";
            WriteLog writeLog = new WriteLog();
            writeLog.wirte(query);
            DataTable table = new DataTable();
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            SqlDataReader myReader;
            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand nyCommand = new SqlCommand(query,myCon))
                {
                    myReader = nyCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpGet("GetUserbyId")]
        public JsonResult GetUserbyId(int id)
        {
            string query = "select id,ten,email,vai_tro,anh_dai_dien,tom_tat from users where id = " + id;
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

        [HttpGet("SearchUser")]
        public JsonResult SearchUser(string colum,string content, int CurentPage, int PageLength)
        {
            string query = "select id,ten,email,vai_tro,anh_dai_dien,tom_tat from users where "+ colum + " like '%"+ content + "%' "+
                "ORDER BY id OFFSET "+ CurentPage * PageLength + " ROWS FETCH NEXT "+ PageLength + " ROWS ONLY";
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

        [HttpPut("AddUser")]
        public JsonResult AddUserbyId(User user)
        {
            string query = "INSERT INTO users ( ten_dang_nhap, mat_khau, email, ten, vai_tro, anh_dai_dien, tom_tat)" +
                "VALUES" +
                "( '"+user.ten_dang_nhap+"', '"+user.mat_khau+"', '"+user.email+"', N'"+user.ten+"', '"+user.vai_tro+"', '"+user.anh_dai_dien+"', N'"+user.tom_tat+"')";
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

        [HttpPatch("UpdateUserbyId")]
        public JsonResult EditUserbyId(EditUser user)
        {
            string query = "update users set email = '"+user.email+"', ten = N'"+user.ten+"', anh_dai_dien = '"+user.anh_dai_dien+"', tom_tat = N'"+user.tom_tat+"' where id = "+user.id+"";
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

        [HttpDelete("DeleteUserbyId")]
        public JsonResult DeleteUserbyId(string id)
        {
            string query = "delete users where id = " + id + "";
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
