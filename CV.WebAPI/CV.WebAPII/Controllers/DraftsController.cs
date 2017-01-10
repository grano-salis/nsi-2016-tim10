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
        [Route("drafts/confirmed/{id:int}")]
        //works only with componentDraft id
        public confirmedComponentDTO confirmedDraftById(int id)
        {
            try
            {
                if (HttpContext.Current.Request.Cookies["sid"] == null)
                    throw new UnauthorizedAccessException("You have to have admin role to perform this action."); //TODO: strpati ovo u tijelo responsea


                UserInfo userInfo = _authProvider.getAuth(HttpContext.Current.Request.Cookies["sid"].Value);

                if (!userInfo.Roles.Contains("ADMIN"))
                    throw new UnauthorizedAccessException("You have to have admin role to perform this action."); //TODO: strpati ovo u tijelo responsea

                XmlDocument doc = new XmlDocument();
                var draft = context.COMPONENTDRAFTs.Include("CV_XML_FRAGMENT").Include("TYPE").Where(c => c.ID == id).Select(c => new confirmedComponentDTO {
                    data = c.CV_XML_FRAGMENT.XML_DATA,
                    title = c.TYPE.FRAGMENT_TYPE,
                    id = c.CV_XML_FRAGMENT.ID
                }).Single();

                if (draft == null)
                    throw new Exception("Draft with specified id does not exist.");

                return draft;
            }
            catch (UnauthorizedAccessException e)
            {
                HttpContext.Current.Response.StatusCode = 401;
                //TODO: this
                throw e;
            }
            catch (Exception e)
            {
                HttpContext.Current.Response.StatusCode = 500;
                throw e;
            }
        }

        [HttpGet]
        [Route("drafts/confirmed")]
        public IEnumerable<confirmedComponentDTO> confirmedDrafts()
        {
            try
            {
                if (HttpContext.Current.Request.Cookies["sid"] == null)
                    throw new UnauthorizedAccessException("You have to have be logged in to perform this action."); //TODO: strpati ovo u tijelo responsea


                UserInfo userInfo = _authProvider.getAuth(HttpContext.Current.Request.Cookies["sid"].Value);
                int id = userInfo.UserId;

                var ret = context.CV_XML_FRAGMENT.Include("CV_FRAGMENT_TYPE").Where(c => c.USER_ID.Value == id).Select(c => new confirmedComponentDTO
                {
                    data = c.XML_DATA,
                    id = c.ID,
                    title = c.CV_FRAGMENT_TYPE.FRAGMENT_TYPE,
                }
                    ).ToList();

                XmlDocument doc = new XmlDocument();

                foreach (var r in ret)
                {
                    if (r.data != null)
                    {
                        doc.LoadXml(r.data);
                        r.data = JsonConvert.SerializeXmlNode(doc);
                    }
                }
                return ret;
            }
            catch (UnauthorizedAccessException e)
            {
                HttpContext.Current.Response.StatusCode = 401;
                //TODO: this
                throw e;
            }
            catch (Exception e)
            {
                HttpContext.Current.Response.StatusCode = 500;
                throw e;
            }
        }

        [HttpGet]
        [Route("drafts/waiting")]
        public List<unconfirmedDraftsDTO> unconfirmedDrafts()
        {
            try
            {
                if (HttpContext.Current.Request.Cookies["sid"] == null)
                    throw new UnauthorizedAccessException("You have to have admin role to perform this action."); //TODO: strpati ovo u tijelo responsea


                UserInfo userInfo = _authProvider.getAuth(HttpContext.Current.Request.Cookies["sid"].Value);

                if (!userInfo.Roles.Contains("ADMIN"))
                    throw new UnauthorizedAccessException("You have to have admin role to perform this action."); //TODO: strpati ovo u tijelo responsea

                XmlDocument doc = new XmlDocument();
                /*
                var query = from u in context.CV_USER
                            join cd in context.COMPONENTDRAFTs.Include("TYPE").Include("USER").Where(cd => cd.APPROVED == "w") on u.ID equals cd.USER_ID into drafts
                            from d in drafts.DefaultIfEmpty()
                            group d by u.ID into result
                            select new unconfirmedDraftsDTO
                            {
                                user_id = result.Key,
                                username = result.FirstOrDefault().USER.USERNAME,
                                drafts = result.Select(component => new ComponentDTO
                                {
                                    approved = component.APPROVED,
                                    data = component.APPROVED,
                                    id = component.ID,
                                    title = component.TYPE.FRAGMENT_TYPE
                                }).ToList()
                            };
                */

                var drafts = context.COMPONENTDRAFTs.Include("USER").Include("TYPE").Where(cd => cd.APPROVED == "w").ToList();

                Dictionary<int, List<ComponentVM>> h = new Dictionary<int, List<ComponentVM>>();
                foreach(var d in drafts)
                {
                    if (d.DATA != null)
                    {
                        doc.LoadXml(d.DATA);
                        d.DATA = JsonConvert.SerializeXmlNode(doc);
                    }

                    if (!h.Keys.Contains(d.USER_ID))
                        h[d.USER_ID] = new List<ComponentVM>();
                    h[d.USER_ID].Add(new ComponentVM
                    {
                        approved = d.APPROVED,
                        data = d.DATA,
                        id = d.ID,
                        title = d.TYPE.FRAGMENT_TYPE,
                        username = d.USER.USERNAME
                    });
                }
                List<unconfirmedDraftsDTO> result = new List<unconfirmedDraftsDTO>();

                foreach(var id in h.Keys)
                {
                    result.Add(new unconfirmedDraftsDTO
                    {
                        drafts = h[id],
                        username = h[id].FirstOrDefault().username,
                        user_id = id
                    });
                }

                return result;

            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("users/{id:int}/drafts/waiting")]
        //only admin can perform this action
        public AdminDTO unconfirmedDraftsByUsersId(int id) //TODO change returning types to http
        {
            try
            {
                if(HttpContext.Current.Request.Cookies["sid"] == null)
                    throw new UnauthorizedAccessException("You have to have admin role to perform this action."); //TODO: strpati ovo u tijelo responsea

                UserInfo userInfo = _authProvider.getAuth(HttpContext.Current.Request.Cookies["sid"].Value);

                if (!userInfo.Roles.Contains("ADMIN"))
                    throw new UnauthorizedAccessException("You have to have admin role to perform this action."); //TODO: strpati ovo u tijelo responsea
                

                AdminDTO a = new AdminDTO();
                a.user = context.CV_USER_INFO.Where(ui => ui.USER_ID == id).First();

                if (a.user == null)
                    throw new Exception("User with specified id does not exist.");

                var ret = context.COMPONENTDRAFTs.Where(cd => cd.APPROVED == "w" && cd.USER_ID == id).ToList();

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
                    d.id = r.ID;
                    dto.Add(d);
                }

                a.components = dto;
                return a;
            }
            catch (UnauthorizedAccessException e)
            {
                HttpContext.Current.Response.StatusCode  = 401;
                //TODO: this
                throw e;
            }
            catch (Exception e)
            {
                HttpContext.Current.Response.StatusCode = 500;
                throw e;
            }
            
        }

        [HttpPost]
        //this method can only be used by logged-in users
        [Route("drafts")]
        public HttpResponseMessage saveDraft([FromBody]List<NewDraft> components)
        {
            try
            {
                if (HttpContext.Current.Request.Cookies["sid"] == null)
                    throw new UnauthorizedAccessException("You have to have be logged in to perform this action."); //TODO: strpati ovo u tijelo responsea


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
                if (HttpContext.Current.Request.Cookies["sid"] == null)
                    throw new UnauthorizedAccessException("You have to have admin role to perform this action."); //TODO: strpati ovo u tijelo responsea


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
