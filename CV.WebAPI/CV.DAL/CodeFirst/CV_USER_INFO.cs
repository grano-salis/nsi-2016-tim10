namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.CV_USER_INFO")]
    public partial class CV_USER_INFO
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        public int USER_ID { get; set; }

        [StringLength(100)]
        public string FIRST_NAME { get; set; }

        [StringLength(100)]
        public string LAST_NAME { get; set; }

        [StringLength(100)]
        public string EMAIL { get; set; }

        public virtual CV_USER CV_USER { get; set; }
    }
}
