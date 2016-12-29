using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CV.WebAPII.ViewModels
{
    public class AdminDTO
    {
        public CV.DAL.CodeFirst.CV_USER_INFO user { get; set; }

        public List<ComponentDTO> components { get; set; }
    }
}