namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.ZAPISNIK")]
    public partial class ZAPISNIK
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ZAPISNIK()
        {
            SJEDNICAs = new HashSet<SJEDNICA>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        [StringLength(500)]
        public string TEKST { get; set; }

        public decimal SJEDNICA_ID { get; set; }

        public decimal PRILOG_ID { get; set; }

        public decimal KREATOR_ID { get; set; }

        public virtual PRILOG PRILOG { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SJEDNICA> SJEDNICAs { get; set; }

        public virtual SJEDNICA SJEDNICA { get; set; }

        public virtual UCESNIK UCESNIK { get; set; }
    }
}
