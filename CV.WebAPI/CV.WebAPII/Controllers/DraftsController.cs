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
using CV.WebAPII.Providers;
using System.Web;

namespace CV.WebAPII.Controllers
{
    public class DraftsController : ApiController
    {
        private context context;
        private AuthProvider _authProvider;
        public DraftsController()
        {
            context = new context();
            _authProvider = new AuthProvider();
        }

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
        //this method can only be used by logged-in users
        [Route("drafts")]
        public HttpResponseMessage saveDraft([FromBody]List<NewDraft> components)
        {
            try
            {
                UserInfo userInfo = _authProvider.getAuth(HttpContext.Current.Request.Cookies["sid"].Value);
                int id = userInfo.UserId;

                foreach(var value in components)
                {
                    // insert new draft with this type
                    if (value.id == null)
                    {
                        CV_FRAGMENT_TYPE ft = context.CV_FRAGMENT_TYPE.Where(f => f.FRAGMENT_TYPE == value.title).FirstOrDefault();

                        COMPONENTDRAFT cd = new COMPONENTDRAFT();
                        cd.ADDITIONALINFO = value.additionalInfo;
                        cd.USER_ID = id;
                        cd.APPROVED = "w";
                        cd.TYPE_ID = ft.ID;
                        XmlDocument doc = JsonConvert.DeserializeXmlNode(value.data);
                        cd.DATA = doc.OuterXml;
                        /*
                        CV_XML_FRAGMENT component = new CV_XML_FRAGMENT();
                        component.FRAGMENT_TYPE = ft.ID;
                        component.USER_ID = id;
                        component.XML_DATA = "<empty></empty>";

                        context.CV_XML_FRAGMENT.Add(component);
                        context.SaveChanges();

                        cd.COMPONENTID = component.ID;
                        */
                        context.COMPONENTDRAFTs.Add(cd);

                        
                    }
                    // update
                    else
                    {
                        COMPONENTDRAFT draft = context.COMPONENTDRAFTs.Single(c => value.id == value.id);
                        if (draft == null)
                            throw new Exception("Draft with specified id does not exist.");

                        if (value.additionalInfo != "")
                            draft.ADDITIONALINFO = value.additionalInfo;

                        draft.APPROVED = "w";

                        XmlDocument doc = JsonConvert.DeserializeXmlNode(value.data);
                        draft.DATA = doc.OuterXml;

                    }
                }
                
                context.SaveChanges();
            }
            catch (UnauthorizedAccessException e)
            {
                return new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }
            catch (Exception e)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }

            return new HttpResponseMessage(HttpStatusCode.Created);
      }
        [HttpPost]
        //only admins can do this
        [Route("drafts/{id:int}/approve")]
        public HttpResponseMessage approveDraft(int id)
        {
            try
            {

                UserInfo userInfo = _authProvider.getAuth(HttpContext.Current.Request.Cookies["sid"].Value);

                if (!userInfo.Roles.Contains("ADMIN"))
                    throw new UnauthorizedAccessException("You have to have admin role to perform this action."); //TODO: strpati ovo u tijelo responsea

                COMPONENTDRAFT cd = context.COMPONENTDRAFTs.Single(c => c.ID == id);
                if (cd == null)
                    throw new Exception("Component with specified ID not found.");
                
                cd.APPROVED = "a";
                if(cd.COMPONENTID == null)
                {
                    CV_XML_FRAGMENT component = new CV_XML_FRAGMENT();
                    component.FRAGMENT_TYPE = cd.TYPE_ID;
                    component.USER_ID = cd.USER_ID;
                    component.XML_DATA = cd.DATA;
                    context.CV_XML_FRAGMENT.Add(component);
                    context.SaveChanges();
                    cd.CV_XML_FRAGMENT = component;
                }
                else
                {
                    CV_XML_FRAGMENT component = context.CV_XML_FRAGMENT.Single(c => c.ID == cd.COMPONENTID);
                    component.XML_DATA = cd.DATA;
                }
                context.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (UnauthorizedAccessException e)
            {
                return new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }
            catch (Exception)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound); //TODO make custom exceptions 
            }
            
        }

    }
}
