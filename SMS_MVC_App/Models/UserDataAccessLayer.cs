using System;
using System.Data;
using System.Data.SqlClient;

namespace SMS_MVC_App.Models
{
    public class UserDataAccessLayer
    {
        string connectionString = "Data Source=PUN-DE-LE09A19\\SQLEXPRESS;Initial Catalog=SMS;Integrated Security=true;";
        public bool GetAuthUser(HUser user)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {

                SqlCommand cmd = new SqlCommand("spGetAuth", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@username", user.Username);
                cmd.Parameters.AddWithValue("@password", user.Password);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                if(rdr.HasRows)
                {
                    con.Close();
                    return true;
                }
                else
                {
                    con.Close();
                    return false;
                }


            }
            
        }
    }
}
