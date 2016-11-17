namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.CV_LOG")]
    public partial class CV_LOG
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        public int USER_ID { get; set; }

        [Required]
        [StringLength(200)]
        public string LOG_TEXT { get; set; }

        public DateTime CREATED { get; set; }

        public virtual CV_USER CV_USER { get; set; }
    }
}
