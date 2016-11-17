namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.DOCUMENTTYPE")]
    public partial class DOCUMENTTYPE
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DOCUMENTTYPE()
        {
            ITEMs = new HashSet<ITEM>();
            METADATAs = new HashSet<METADATA>();
        }

        public decimal ID { get; set; }

        [Column("DOCUMENTTYPE")]
        [Required]
        [StringLength(100)]
        public string DOCUMENTTYPE1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ITEM> ITEMs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<METADATA> METADATAs { get; set; }
    }
}
