namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.METADATA")]
    public partial class METADATA
    {
        public decimal ID { get; set; }

        public decimal ITEMID { get; set; }

        public decimal DOCUMENTTYPEID { get; set; }

        [StringLength(70)]
        public string AUTHOR { get; set; }

        [StringLength(500)]
        public string ABSTRACT { get; set; }

        [StringLength(100)]
        public string PUBLISHER { get; set; }

        [StringLength(50)]
        public string LANGUAGE { get; set; }

        [StringLength(500)]
        public string URL { get; set; }

        [StringLength(500)]
        public string RIGHTS { get; set; }

        public DateTime? DATEPUBLISHED { get; set; }

        [StringLength(1000)]
        public string EXTRA { get; set; }

        public virtual DOCUMENTTYPE DOCUMENTTYPE { get; set; }
    }
}
