namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.CRITERIA")]
    public partial class Criterion
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Criterion()
        {
            CRITERIA1 = new HashSet<Criterion>();
            CV_ITEM = new HashSet<CV_ITEM>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long ID_CRITERIA { get; set; }

        [StringLength(2000)]
        public string NAME { get; set; }

        [StringLength(4000)]
        public string DESCRIPTION { get; set; }

        public int? CRITERIA_LEVEL { get; set; }

        public decimal? POINTS { get; set; }

        public DateTime? DATE_CREATED { get; set; }

        public DateTime? DATE_MODIFIED { get; set; }

        public long? PARENT_CRITERIA { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Criterion> CRITERIA1 { get; set; }

        public virtual Criterion Criterion1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CV_ITEM> CV_ITEM { get; set; }
    }
}
