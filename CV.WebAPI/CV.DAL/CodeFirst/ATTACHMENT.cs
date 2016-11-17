namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.ATTACHMENT")]
    public partial class ATTACHMENT
    {
        public decimal ID { get; set; }

        public decimal ITEMID { get; set; }

        [Required]
        [StringLength(100)]
        public string PATH { get; set; }

        public virtual ITEM ITEM { get; set; }
    }
}
