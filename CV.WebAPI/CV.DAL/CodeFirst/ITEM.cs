namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.ITEM")]
    public partial class ITEM
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ITEM()
        {
            ATTACHMENTs = new HashSet<ATTACHMENT>();
        }

        public decimal ID { get; set; }

        public decimal? COLLECTIONID { get; set; }

        public decimal DOCUMENTTYPEID { get; set; }

        [Required]
        [StringLength(1)]
        public string ISPRIVATE { get; set; }

        [Required]
        [StringLength(500)]
        public string TITLE { get; set; }

        public decimal CREATEDBY { get; set; }

        public DateTime DATECREATED { get; set; }

        public decimal MODIFIEDBY { get; set; }

        public DateTime DATEMODIFIED { get; set; }

        [Required]
        [StringLength(1)]
        public string ISDELETED { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ATTACHMENT> ATTACHMENTs { get; set; }

        public virtual COLLECTION COLLECTION { get; set; }

        public virtual CV_USER CV_USER { get; set; }

        public virtual CV_USER CV_USER1 { get; set; }

        public virtual DOCUMENTTYPE DOCUMENTTYPE { get; set; }
    }
}
