using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using webAPI.Model;

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
    }
}
