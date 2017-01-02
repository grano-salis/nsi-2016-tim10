using CV.DAL.CodeFirst;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Xml;
using CV.WebAPII.ViewModels;

namespace CV.WebAPII.Controllers
{
    public class DraftsController : ApiController
    {
        private context context = new context();

        [HttpGet]
        [Route("users/{id:int}/drafts")]
        public IEnumerable<ComponentDTO> draftsByUsersId(int id)
        {
            var ret = context.COMPONENTDRAFTs.Where(cd => cd.CV_XML_FRAGMENT.USER_ID.Value == id).ToList();
            //System.Xml.Serialization.XmlSerializer xs = new System.Xml.Serialization.XmlSerializer(COMPONENTDRAFT);
            //return ret;

            // To convert an XML node contained in string xml into a JSON string   
            XmlDocument doc = new XmlDocument();

            foreach (var r in ret)
            {
                //ako bude trebalo
                //context.Entry(r).State = System.Data.Entity.EntityState.Detached;
                if (r.DATA != null)
                {
                    doc.LoadXml(r.DATA);
                    r.DATA = JsonConvert.SerializeXmlNode(doc);
                }
            }
            //string jsonText = JsonConvert.SerializeXmlNode(doc);

            // To convert JSON text contained in string json into an XML node
            //XmlDocument doc = JsonConvert.DeserializeXmlNode(json);
            //return ret;
            List<ComponentDTO> dto = new List<ComponentDTO>();
            foreach (var r in ret)
            {
                ComponentDTO d = new ComponentDTO();
                d.title = r.ADDITIONALINFO;
                d.data = r.DATA;
                d.approved = r.APPROVED;
                dto.Add(d);
            }
            return dto;
        }

        [HttpGet]
        [Route("admin/drafts")]
        public IEnumerable<COMPONENTDRAFT> unconfirmedDrafts()
        {
            var ret = context.COMPONENTDRAFTs.Where(cd => cd.APPROVED == "f").ToList();
            XmlDocument doc = new XmlDocument();
            foreach (var r in ret)
            {
                //context.Entry(r).State = System.Data.Entity.EntityState.Detached;
                if (r.DATA != null)
                {
                    doc.LoadXml(r.DATA);
                    r.DATA = JsonConvert.SerializeXmlNode(doc);
                }
            }
            return ret;
        }

        [HttpGet]
        [Route("admin/{id:int}/drafts")]
        public AdminDTO unconfirmedDraftsByUsersId(int id)
        {
            var ret = context.COMPONENTDRAFTs.Where(cd => cd.APPROVED == "f" && cd.CV_XML_FRAGMENT.USER_ID.Value == id).ToList();
            XmlDocument doc = new XmlDocument();
            foreach (var r in ret)
            {
                //context.Entry(r).State = System.Data.Entity.EntityState.Detached;
                if (r.DATA != null)
                {
                    doc.LoadXml(r.DATA);
                    r.DATA = JsonConvert.SerializeXmlNode(doc);
                }
            }
            //return ret;
            List<ComponentDTO> dto = new List<ComponentDTO>();
            foreach (var r in ret)
            {
                ComponentDTO d = new ComponentDTO();
                d.title = r.ADDITIONALINFO;
                d.data = r.DATA;
                d.approved = r.APPROVED;
                dto.Add(d);
            }
            AdminDTO a = new AdminDTO();
            a.user = context.CV_USER.Find(id).CV_USER_INFO.First();
            a.components = dto;
            return a;
        }

        [HttpPost]
        
        [Route("users/{id:int}/draft")]
        public void saveDraft([FromBody]ComponentDTO value, int id)
        {
            COMPONENTDRAFT cd = new COMPONENTDRAFT();
            cd.ADDITIONALINFO = "";
            cd.DATA = value.data;
            cd.APPROVED = "f";
            // insert
            if (value.id == null)
            {
                CV_XML_FRAGMENT frag = new CV_XML_FRAGMENT();
                CV_FRAGMENT_TYPE ft = context.CV_FRAGMENT_TYPE.Where(f => f.FRAGMENT_TYPE == cd.ADDITIONALINFO).FirstOrDefault();
                if (cd.DATA != null)
                {
                    XmlDocument doc = JsonConvert.DeserializeXmlNode(cd.DATA);
                    cd.DATA = doc.OuterXml;
                }
                frag.COMPONENTDRAFTs.Add(cd);
                context.CV_USER.Find(id).CV_XML_FRAGMENT.Add(frag);
                //context.SaveChanges();
            }
            // update
            else
            {
                COMPONENTDRAFT draft = context.COMPONENTDRAFTs.First(c => value.id == cd.ID);
                draft.ADDITIONALINFO = cd.ADDITIONALINFO;
                draft.APPROVED = cd.APPROVED;
                if (cd.DATA != null)
                {
                    XmlDocument doc = JsonConvert.DeserializeXmlNode(cd.DATA);
                    draft.DATA = doc.OuterXml;
                }
                //context.SaveChanges();
            }
            context.SaveChanges();
        }

        [HttpPost]
        [Route("users/{id:int}/drafts")]
        public void saveDraft([FromBody]List<ComponentDTO> value, int id)
        {
            //value.APPROVED = "f"; // zasto je ovo string ?
            //// insert
            //if (value.ID == 0)
            //{
            //    CV_XML_FRAGMENT frag = new CV_XML_FRAGMENT();
            //    XmlDocument doc = JsonConvert.DeserializeXmlNode(value.DATA);
            //    value.DATA = doc.OuterXml;
            //    frag.COMPONENTDRAFTs.Add(value);
            //    context.CV_USER.Find(id).CV_XML_FRAGMENT.Add(frag);
            //    //context.SaveChanges();
            //}
            //// update
            //else
            //{
            //    COMPONENTDRAFT draft = context.COMPONENTDRAFTs.First(cd => cd.ID == value.ID && cd.COMPONENTID == value.COMPONENTID);
            //    draft.ADDITIONALINFO = value.ADDITIONALINFO;
            //    draft.APPROVED = value.APPROVED;
            //    XmlDocument doc = JsonConvert.DeserializeXmlNode(value.DATA);
            //    draft.DATA = doc.OuterXml;
            //    //context.SaveChanges();
            //}
            //context.SaveChanges();

            foreach (var v in value)
            {
                COMPONENTDRAFT cd = new COMPONENTDRAFT();
                cd.ADDITIONALINFO = v.title;
                cd.DATA = v.data;
                cd.APPROVED = "f";
                CV_USER u = context.CV_USER.Where(user => user.ID == id).Single();
                if (u == null)
                    throw new Exception("User does not exist!");

                cd.USER_ID = u.ID;

                // insert
                if (v.id == null)
                {
                    //CV_XML_FRAGMENT frag = new CV_XML_FRAGMENT();
                    CV_FRAGMENT_TYPE ft = context.CV_FRAGMENT_TYPE.Where(f => f.FRAGMENT_TYPE == v.title).SingleOrDefault();
                    if (ft == null)
                        throw new Exception("Component with that title does not exist!");

                    if (cd.DATA != null)
                    {
                        XmlDocument doc = JsonConvert.DeserializeXmlNode(cd.DATA);
                        cd.DATA = doc.OuterXml;
                    }
                    //frag.COMPONENTDRAFTs.Add(cd);
                    
                    //TO DO: move this to admin method

                    CV_XML_FRAGMENT component = new CV_XML_FRAGMENT();
                    component.XML_DATA = "<empty></empty>";
                    component.USER_ID = u.ID;
                    component.FRAGMENT_TYPE = ft.ID;
                    context.CV_XML_FRAGMENT.Add(component);
                    context.SaveChanges();
                    cd.CV_XML_FRAGMENT = component;

                    context.COMPONENTDRAFTs.Add(cd);                   
                    context.SaveChanges();
                }
                // update
                else
                {
                    COMPONENTDRAFT draft = context.COMPONENTDRAFTs.First(c => cd.ID == cd.ID);
                    draft.ADDITIONALINFO = cd.ADDITIONALINFO;
                    draft.APPROVED = cd.APPROVED;
                    if (cd.DATA != null)
                    {
                        XmlDocument doc = JsonConvert.DeserializeXmlNode(cd.DATA);
                        draft.DATA = doc.OuterXml;
                    }
                    //context.SaveChanges();
                }
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
