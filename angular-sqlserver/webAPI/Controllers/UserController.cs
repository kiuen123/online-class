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
            // query + connection
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            string query = "select id,ten,email,vai_tro,anh_dai_dien,tom_tat from users";

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

        [HttpGet("GetAllTeacher")]
        public JsonResult GetAllTeacher()
        {
            // query + connection
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            string query = "select id,ten from users where vai_tro = 'teacher'";

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

        [HttpGet("GetUserbyId")]
        public JsonResult GetUserbyId(int id)
        {
            // query + connection
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            string query = "select id,ten,email,vai_tro,anh_dai_dien,tom_tat from users where id = " + id;
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

        [HttpGet("SearchUser")]
        public JsonResult SearchUser(string colum,string content, int CurentPage, int PageLength)
        {
            // query + connection
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            string query = "select id,ten,email,vai_tro,anh_dai_dien,tom_tat from users where "+ colum + " like '%"+ content + "%' "+
                "ORDER BY id OFFSET "+ CurentPage * PageLength + " ROWS FETCH NEXT "+ PageLength + " ROWS ONLY";

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

        [HttpPost("AddUser")]
        public JsonResult AddUserbyId(User user)
        {
            // query + connection
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            string query = "INSERT INTO users ( ten_dang_nhap, mat_khau, email, ten, vai_tro, anh_dai_dien, tom_tat)" +
                "VALUES" +
                "( '"+user.ten_dang_nhap+"', '"+user.mat_khau+"', '"+user.email+"', N'"+user.ten+"', '"+user.vai_tro+"', '"+user.anh_dai_dien+"', N'"+user.tom_tat+"')";

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

        [HttpPatch("UpdateUserbyId")]
        public JsonResult EditUserbyId(EditUser user)
        {
            // query + connection
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            string query = "update users set email = '"+user.email+"', ten = N'"+user.ten+"', anh_dai_dien = '"+user.anh_dai_dien+"', tom_tat = N'"+user.tom_tat+"' where id = "+user.id+"";

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

        [HttpDelete("DeleteUserbyId")]
        public JsonResult DeleteUserbyId(string id)
        {
            // query + connection
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            string query = "delete users where id = " + id + "";
            
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
