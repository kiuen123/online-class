
using File = System.IO.File;

namespace webAPI.Model
{
    public class WriteLog
    {
        public void wirte(string data) {
            string[] writelog = new[] { data };
            File.AppendAllLines("log.txt", writelog);
        }
    }
}
