using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;

namespace WFAdmin
{
    class DBConection
    {
        public static String DBConnection() {
            string connString = "Data Source=DESKTOP-EQR1553\\SQLEXPRESS;Initial Catalog=kteachlab;Integrated Security=True;TrustServerCertificate=True";
            return connString;
        }
    }
}
