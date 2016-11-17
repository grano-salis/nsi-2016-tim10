namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.CV_MANAGE_ROLES")]
    public partial class CV_MANAGE_ROLES
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        public int USER_ID { get; set; }

        public int ROLE_ID { get; set; }

        public virtual CV_USER CV_USER { get; set; }

        public virtual CV_ROLES CV_ROLES { get; set; }
    }
}
