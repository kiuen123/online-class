namespace webAPI.Model
{
    public class PostAdd
    {
        public int id_tacgia { get; set; }
        public int id_course { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public string created_at { get; set; }
        public string update_at { get; set; }
    }
}
