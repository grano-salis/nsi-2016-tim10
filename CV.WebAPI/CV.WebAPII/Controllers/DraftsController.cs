using CV.DAL.CodeFirst;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CV.WebAPII.Controllers
{
    public class DraftsController : ApiController
    {
        private context context = new context();

        [HttpGet]
        [Route("users/{id:int}/drafts")]
        public IEnumerable<COMPONENTDRAFT> draftsByUsersId(int id)
        {
            var ret = context.COMPONENTDRAFTs.Where(cd => cd.CV_XML_FRAGMENT.USER_ID.Value == id).ToList();
            return ret;
        }

        [HttpGet]
        [Route("admin/drafts")]
        public IEnumerable<COMPONENTDRAFT> unconfirmedDrafts()
        {
            return context.COMPONENTDRAFTs.Where(cd => cd.APPROVED == "f").ToList();
        }

        [HttpGet]
        [Route("admin/{id:int}/drafts")]
        public IEnumerable<COMPONENTDRAFT> unconfirmedDraftsByUsersId(int id)
        {
            return context.COMPONENTDRAFTs.Where(cd => cd.APPROVED == "f" && cd.CV_XML_FRAGMENT.USER_ID.Value == id).ToList();
        }

        [HttpPost]
        [Route("users/{id:int}/drafts")]
        public void saveDraft([FromBody]COMPONENTDRAFT value, int id)
        {
            value.APPROVED = "f"; // zasto je ovo string ?
            // insert
            if (value.ID == 0) {
                CV_XML_FRAGMENT frag = new CV_XML_FRAGMENT();
                frag.COMPONENTDRAFTs.Add(value);
                context.CV_USER.Find(id).CV_XML_FRAGMENT.Add(frag);
                //context.SaveChanges();
            }
            // update
            else {
                COMPONENTDRAFT draft = context.COMPONENTDRAFTs.First(cd => cd.ID == value.ID && cd.COMPONENTID == value.COMPONENTID);
                draft.ADDITIONALINFO = value.ADDITIONALINFO;
                draft.APPROVED = value.APPROVED;
                draft.DATA = value.DATA;
                //context.SaveChanges();
            }
            context.SaveChanges();
        }

        [HttpPost]
        [Route("drafts/approve")]
        public void approveDraft([FromBody]int id)
        {
            COMPONENTDRAFT cd = context.COMPONENTDRAFTs.Find(id);
            cd.CV_XML_FRAGMENT.XML_DATA = cd.DATA;
            cd.APPROVED = "t";
            context.SaveChanges();
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
