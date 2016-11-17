namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.CV_CLAIM")]
    public partial class CV_CLAIM
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        public int USER_ID { get; set; }

        [Required]
        [StringLength(200)]
        public string TOKEN { get; set; }

        public DateTime CREATED { get; set; }

        [StringLength(1)]
        public string VALID { get; set; }

        public virtual CV_USER CV_USER { get; set; }
    }
}
