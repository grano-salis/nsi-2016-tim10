namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.COLLECTION")]
    public partial class COLLECTION
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public COLLECTION()
        {
            ITEMs = new HashSet<ITEM>();
        }

        public decimal ID { get; set; }

        [Required]
        [StringLength(100)]
        public string TITLE { get; set; }

        [StringLength(500)]
        public string DESCRIPTION { get; set; }

        [Required]
        [StringLength(1)]
        public string ISPRIVATE { get; set; }

        public decimal CREATEDBY { get; set; }

        public DateTime DATECREATED { get; set; }

        public decimal MODIFIEDBY { get; set; }

        public DateTime DATEMODIFIED { get; set; }

        [Required]
        [StringLength(1)]
        public string ISDELETED { get; set; }

        public virtual CV_USER CV_USER { get; set; }

        public virtual CV_USER CV_USER1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ITEM> ITEMs { get; set; }
    }
}
