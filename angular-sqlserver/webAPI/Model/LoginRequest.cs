using System.ComponentModel.DataAnnotations;

namespace webAPI.Model
{
    public class LoginRequest
    {
        [Required]
        public string ten_dang_nhap { get; set; }

        [Required]
        public string mat_khau { get; set; }
    }
}
