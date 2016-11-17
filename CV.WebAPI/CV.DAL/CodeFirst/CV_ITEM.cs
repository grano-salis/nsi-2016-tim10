namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.CV_ITEM")]
    public partial class CV_ITEM
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CV_ITEM()
        {
            CV_ITEM1 = new HashSet<CV_ITEM>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long ID_ITEM { get; set; }

        [StringLength(1000)]
        public string NAME { get; set; }

        [StringLength(4000)]
        public string DESCRIPTION { get; set; }

        public DateTime? START_DATE { get; set; }

        public DateTime? END_DATE { get; set; }

        [StringLength(1000)]
        public string ATTACHMENT_LINK { get; set; }

        public DateTime? DATE_CREATED { get; set; }

        public DateTime? DATE_MODIFIED { get; set; }

        public DateTime? DATE_CONFIRMED { get; set; }

        public long? OLD_ITEM_ID { get; set; }

        public long CV_TABLE_ID_CV { get; set; }

        [Required]
        [StringLength(128)]
        public string USER_ID_APPROVED { get; set; }

        public long? CRITERIA_ID_CRITERIA { get; set; }

        public int STATUS_ID { get; set; }

        public virtual Criterion Criterion { get; set; }

        public virtual CV_ITEM_STATUS CV_ITEM_STATUS { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CV_ITEM> CV_ITEM1 { get; set; }

        public virtual CV_ITEM CV_ITEM2 { get; set; }

        public virtual CV_TABLE CV_TABLE { get; set; }
    }
}
