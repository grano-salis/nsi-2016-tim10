using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CV.WebAPII.ViewModels
{
    public class unconfirmedDraftsDTO
    {
        public int user_id;

        public string username;

        public List<ComponentVM> drafts;
    }
}