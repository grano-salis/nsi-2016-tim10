namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.GLAS")]
    public partial class GLA
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        public decimal STAVKA_DNEVNOG_REDA_ID { get; set; }

        public decimal TIP_GLASA_ID { get; set; }

        public decimal UCESNIK_ID { get; set; }

        public virtual STAVKA_DNEVNOG_REDA STAVKA_DNEVNOG_REDA { get; set; }

        public virtual TIP_GLASA TIP_GLASA { get; set; }

        public virtual UCESNIK UCESNIK { get; set; }
    }
}
