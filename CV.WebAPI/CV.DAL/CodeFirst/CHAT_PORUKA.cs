namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.CHAT_PORUKA")]
    public partial class CHAT_PORUKA
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        public decimal UCESNIK_ID { get; set; }

        [Required]
        [StringLength(300)]
        public string PORUKA { get; set; }

        public DateTime VRIJEME { get; set; }

        public virtual UCESNIK UCESNIK { get; set; }
    }
}
