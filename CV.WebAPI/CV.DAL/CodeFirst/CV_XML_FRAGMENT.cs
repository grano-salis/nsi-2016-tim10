namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.CV_XML_FRAGMENT")]
    public partial class CV_XML_FRAGMENT
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CV_XML_FRAGMENT()
        {
            COMPONENTDRAFTs = new HashSet<COMPONENTDRAFT>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        public int? USER_ID { get; set; }

        public int? FRAGMENT_TYPE { get; set; }

        private string _xmlData;
        [Column(TypeName = "xmltype")]
        [Required]
        public string XML_DATA
        {
            get
            {
                return _xmlData;
            }
            set
            {
                _xmlData = value;
            }
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<COMPONENTDRAFT> COMPONENTDRAFTs { get; set; }

        public virtual CV_FRAGMENT_TYPE CV_FRAGMENT_TYPE { get; set; }

        public virtual CV_USER CV_USER { get; set; }
    }
}
