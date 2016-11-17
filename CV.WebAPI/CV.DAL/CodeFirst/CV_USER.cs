namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.CV_USER")]
    public partial class CV_USER
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CV_USER()
        {
            COLLECTIONs = new HashSet<COLLECTION>();
            COLLECTIONs1 = new HashSet<COLLECTION>();
            CV_CLAIM = new HashSet<CV_CLAIM>();
            CV_LOG = new HashSet<CV_LOG>();
            CV_MANAGE_ROLES = new HashSet<CV_MANAGE_ROLES>();
            CV_TABLE = new HashSet<CV_TABLE>();
            ITEMs = new HashSet<ITEM>();
            ITEMs1 = new HashSet<ITEM>();
            CV_USER_INFO = new HashSet<CV_USER_INFO>();
            CV_XML_FRAGMENT = new HashSet<CV_XML_FRAGMENT>();
            UCESNIKs = new HashSet<UCESNIK>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        [Required]
        [StringLength(30)]
        public string USERNAME { get; set; }

        [Required]
        [StringLength(128)]
        public string PASSWORD { get; set; }

        [Required]
        [StringLength(128)]
        public string SALT { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<COLLECTION> COLLECTIONs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<COLLECTION> COLLECTIONs1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CV_CLAIM> CV_CLAIM { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CV_LOG> CV_LOG { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CV_MANAGE_ROLES> CV_MANAGE_ROLES { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CV_TABLE> CV_TABLE { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ITEM> ITEMs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ITEM> ITEMs1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CV_USER_INFO> CV_USER_INFO { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CV_XML_FRAGMENT> CV_XML_FRAGMENT { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UCESNIK> UCESNIKs { get; set; }
    }
}
