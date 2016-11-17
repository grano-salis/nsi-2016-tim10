namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.CV_TABLE")]
    public partial class CV_TABLE
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CV_TABLE()
        {
            CV_ITEM = new HashSet<CV_ITEM>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long ID_CV { get; set; }

        [StringLength(45)]
        public string FIRSTNAME { get; set; }

        [StringLength(45)]
        public string LASTNAME { get; set; }

        [StringLength(1000)]
        public string ADDRESS { get; set; }

        [StringLength(45)]
        public string PHONE { get; set; }

        [StringLength(45)]
        public string MOBILEPHONE { get; set; }

        [StringLength(45)]
        public string EMAIL { get; set; }

        public DateTime? BIRTH_DATE { get; set; }

        public int USER_ID { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CV_ITEM> CV_ITEM { get; set; }

        public virtual CV_USER CV_USER { get; set; }
    }
}
