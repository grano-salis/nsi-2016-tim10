namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.COMPONENTDRAFT")]
    public partial class COMPONENTDRAFT
    {
        public decimal ID { get; set; }

        public decimal? COMPONENTID { get; set; }

        [StringLength(1)]
        public string APPROVED { get; set; }

        public string ADDITIONALINFO { get; set; }

        [Column(TypeName = "xmltype")]
        public string DATA { get; set; }

        public virtual CV_XML_FRAGMENT CV_XML_FRAGMENT { get; set; }
    }
}
