using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WFAdmin
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();

        }
        private void loadusers() 
        {
            String str = DBConection.DBConnection();
            String query = "select * from users";
            try
            {
                SqlConnection con = new SqlConnection(str);
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Connection = con;
                cmd.CommandType = CommandType.Text;
                SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(cmd);
                DataTable userstable = new DataTable();
                sqlDataAdapter.Fill(userstable);
                dataUsersGridView.DataSource = userstable;
            }
            catch (Exception es)
            {
                Console.WriteLine(es.Message);
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            loadusers();
        }
    }
}
