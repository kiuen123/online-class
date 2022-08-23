using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using webAPI.Model;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckLoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public CheckLoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("CheckLogin")]
        public JsonResult CheckLogin(LoginRequest loginmodel)
        {
            var username = loginmodel.ten_dang_nhap;
            var password = loginmodel.mat_khau;
            if (username == null || password == null)
                return new JsonResult("");
            string query = "select id,ten,email,vai_tro,anh_dai_dien,tom_tat from users where ten_dang_nhap = '" + username + "' and mat_khau = '" + password + "'";
            
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
