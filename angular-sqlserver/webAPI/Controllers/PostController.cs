using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using webAPI.Model;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : Controller
    {
        private readonly IConfiguration _configuration;
        public PostController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("GetAllPostbyCourseId")]
        public JsonResult GetAllPostbyCourseId(int courseId)
        {
            // query + connection
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            string query = "select * from post where id_course=" + courseId;

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

        [HttpPost("AddPost")]
        public JsonResult AddPost(PostAdd postAdd)
        {
            // query + connection
            String sqlDataSource = _configuration.GetConnectionString("kteachlab");
            string query = "insert into post(id_tacgia,id_course,title,content,create_at,update_at) " +
                "values (" + 
                postAdd.id_tacgia + 
                "," + postAdd.id_course + 
                ",'" + postAdd.title + 
                "','" + postAdd.content + 
                "','" + postAdd.created_at + 
                "','" + postAdd.update_at + 
                "')";

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
